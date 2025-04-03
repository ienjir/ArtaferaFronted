import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError, of} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';
import {environment} from "../../../environments/environment";

export interface LoginRequest {
  email: string;
  password: string;
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
  private baseUrl = environment.apiUrl; // Update with your backend URL
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private refreshTokenTimeout: any;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.getUserInfo().subscribe({
        next: () => {
        },
        error: () => {
        }
      });
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, loginRequest, {withCredentials: true, observe: 'response'})
      .pipe(
        tap(() => {
          this.getUserInfo().subscribe();
        }),
        catchError(this.handleError)
      );
  }

  getUserInfo(): Observable<User> {
    if (!this.isBrowser) {
      return of(null as any);
    }

    return this.http.get<any>(`${this.baseUrl}/auth/me`, {withCredentials: true})
      .pipe(
        map(response => {
          const user: User = {
            id: response.id,
            email: response.email,
            role: response.role
          };

          this.currentUserSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        }),
        catchError(this.handleError)
      );
  }

  getUsers(): Observable<User[]> {
    if (!this.isBrowser) {
      return of([]);
    }

    const payload = {"offset": 0}
    return this.http.post<User[]>(`${this.baseUrl}/user/list`, payload, {withCredentials: true})
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      this.currentUserSubject.next(null);
      this.stopRefreshTokenTimer();

      if (this.isBrowser) {
        document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }

      observer.next();
      observer.complete();
    });
  }

  refreshToken(): Observable<any> {
    if (!this.isBrowser) {
      return of(null);
    }

    return this.http.post<any>(`${this.baseUrl}/auth/refresh`, {}, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(() => {
        this.startRefreshTokenTimer();
      }),
      catchError(this.handleError)
    );
  }

  private startRefreshTokenTimer() {
    if (!this.isBrowser) return;

    this.stopRefreshTokenTimer();

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
    return !!this.currentUserValue;
  }

  hasRole(role: string): boolean {
    return this.currentUserValue?.role === role;
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.error || error.error?.message || errorMessage;
    }

    return throwError(() => ({
      status: error.status,
      message: errorMessage,
      error: error.error || {}
    }));
  }
}
