import {isPlatformBrowser} from '@angular/common';
import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '@environments/environment.development';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {JwtPayload, LoginResponse, RegisterRequest, RegisterResponse, TokenPair} from '@interfaces/auth.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly baseUrl = environment.apiUrl;

  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';

  login(email: string, password: string): Observable<TokenPair> {
    return this.http
      .post<{data: LoginResponse}>(`${this.baseUrl}/auth/login`, {email, password})
      .pipe(
        map((response) => response.data.token),
        tap((tokenPair) => this.storeTokens(tokenPair))
      );
  }

  register(payload: RegisterRequest): Observable<TokenPair> {
    return this.http
      .post<{data: RegisterResponse}>(`${this.baseUrl}/auth/register`, payload)
      .pipe(
        map((response) => response.data.token),
        tap((tokenPair) => this.storeTokens(tokenPair))
      );
  }

  refresh(): Observable<TokenPair> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('Missing refresh token'));
    }

    const headers = new HttpHeaders({
      'X-Refresh-Token': refreshToken
    });

    return this.http
      .post<{data: TokenPair}>(`${this.baseUrl}/auth/refresh`, {}, {headers})
      .pipe(
        map((response) => response.data),
        tap((tokenPair) => this.storeTokens(tokenPair))
      );
  }

  restoreSession(): Observable<boolean> {
    if (!this.isBrowser) {
      return of(false);
    }

    if (this.hasValidAccessToken()) {
      return of(true);
    }

    if (!this.getRefreshToken()) {
      return of(false);
    }

    return this.refresh().pipe(
      map(() => true),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  logout(): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  getAccessToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }

    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }

    return localStorage.getItem(this.refreshTokenKey);
  }

  hasValidAccessToken(): boolean {
    const payload = this.getAccessTokenPayload();
    if (!payload?.exp) {
      return false;
    }

    return payload.exp > Math.floor(Date.now() / 1000);
  }

  getRole(): string | null {
    return this.getAccessTokenPayload()?.role ?? null;
  }

  private storeTokens(tokenPair: TokenPair): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.setItem(this.accessTokenKey, tokenPair.access_token);
    localStorage.setItem(this.refreshTokenKey, tokenPair.refresh_token);
  }

  private getAccessTokenPayload(): JwtPayload | null {
    const token = this.getAccessToken();
    if (!token || !this.isBrowser) {
      return null;
    }

    return this.decodeTokenPayload(token);
  }

  private decodeTokenPayload(token: string): JwtPayload | null {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');

    try {
      const decoded = atob(padded);
      return JSON.parse(decoded) as JwtPayload;
    } catch {
      return null;
    }
  }
}
