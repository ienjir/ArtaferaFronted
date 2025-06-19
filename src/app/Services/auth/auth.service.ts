import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError, of, ReplaySubject} from 'rxjs';
import {catchError, tap, map, first} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';
import {environment} from "../../../environments/environment";

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface User {
  id: number;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isInitialized = new ReplaySubject<boolean>(1);
  public currentUser = this.currentUserSubject.asObservable();
  private refreshTokenTimeout: any;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      // Check if we have a token and try to get user info
      const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      if (accessToken) {
        this.getUserInfo().subscribe({
          next: (user) => {
            this.startRefreshTokenTimer();
            this.isInitialized.next(true);
          },
          error: (error) => {
            // If getting user info fails, clear tokens and user state
            this.clearTokens();
            this.currentUserSubject.next(null);
            this.isInitialized.next(true);
          }
        });
      } else {
        this.isInitialized.next(true);
      }
    } else {
      this.isInitialized.next(true);
    }
  }

  public get currentUserValue(): User | null {
    const user = this.currentUserSubject.value;
    return user;
  }

  public waitForInitialization(): Observable<boolean> {
    return this.isInitialized.pipe(first());
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, loginRequest, { withCredentials: true, observe: 'response' })
      .pipe(
        tap(response => {
          const accessToken = response.body.access_token;
          const refreshToken = response.body.refresh_token;

          if (loginRequest.rememberMe) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
          } else {
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);
          }

          this.getUserInfo().subscribe({
            next: (user) => {
              this.startRefreshTokenTimer();
            },
            error: (error) => {
            }
          });
        }),
        catchError(this.handleError)
      );
  }

  getUserInfo(): Observable<User | null> {
    if (!this.isBrowser) {
      return of(null);
    }

    const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    if (!accessToken) {
      this.currentUserSubject.next(null);
      return of(null);
    }

    return this.http.get<any>(`${this.baseUrl}/auth/me`, { withCredentials: true })
      .pipe(
        map(response => {
          const user: User = {
            id: response.id,
            email: response.email,
            role: response.role,
          };

          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(error => {
          this.currentUserSubject.next(null);
          this.clearTokens();
          return throwError(error);
        })
      );
  }

  getUsers(): Observable<User[]> {
    if (!this.isBrowser) {
      return of([]);
    }

    const payload = { offset: 0 };
    return this.http.post<User[]>(`${this.baseUrl}/user/list`, payload, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      this.currentUserSubject.next(null);
      this.stopRefreshTokenTimer();
      this.clearTokens();
      observer.complete();
    });
  }

  refreshToken(): Observable<any> {
    if (!this.isBrowser) {
      return of(null);
    }

    const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.logout().subscribe();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<any>(`${this.baseUrl}/auth/refresh`, {}, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Refresh-Token': refreshToken
      })
    }).pipe(
      tap(response => {
        const accessToken = response.body.access_token;
        const newRefreshToken = response.body.refresh_token;

        // Store tokens in the same storage as before
        if (localStorage.getItem('accessToken')) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
        } else {
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', newRefreshToken);
        }

        this.startRefreshTokenTimer();
      }),
      catchError(error => {
        this.logout().subscribe();
        return throwError(error);
      })
    );
  }

  private clearTokens() {
    if (this.isBrowser) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }

  private startRefreshTokenTimer() {
    if (!this.isBrowser) return;

    this.stopRefreshTokenTimer();

    // Refresh token 5 minutes before it expires
    this.refreshTokenTimeout = setTimeout(() => {
      this.refreshToken().subscribe();
    }, 25 * 60 * 1000);
  }

  private stopRefreshTokenTimer() {
    if (this.isBrowser && this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }

  isLoggedIn(): boolean {
    const loggedIn = !!this.currentUserValue;
    return loggedIn;
  }

  hasRole(role: string): boolean {
    const hasRole = this.currentUserValue?.role === role;
    return hasRole;
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.error || error.error?.message || errorMessage;
    }

    return throwError({
      status: error.status,
      message: errorMessage,
      error: error.error || {}
    });
  }
}
