import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

interface TokenPair {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + "/auth"
  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ token: TokenPair }> {
    return this.http.post<{ token: TokenPair }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem(this.accessTokenKey, response.token.access_token);
        localStorage.setItem(this.refreshTokenKey, response.token.refresh_token);
      })
    );
  }

  refreshToken(): Observable<TokenPair> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    const headers = new HttpHeaders({
      'X-Refresh-Token': refreshToken || ''
    });
    return this.http.post<TokenPair>(`${this.apiUrl}/refresh`, {}, { headers }).pipe(
      tap(response => {
        localStorage.setItem(this.accessTokenKey, response.access_token);
        localStorage.setItem(this.refreshTokenKey, response.refresh_token);
      })
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }
}
