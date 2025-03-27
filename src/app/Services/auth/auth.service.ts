import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';

  // BehaviorSubject to track auth status
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if the user is already authenticated
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    this.http.get(`${this.apiUrl}/me`, { withCredentials: true }).subscribe({
      next: () => this.isAuthenticatedSubject.next(true),
      error: () => this.isAuthenticatedSubject.next(false),
    });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap(() => this.isAuthenticatedSubject.next(true)) // Mark as authenticated
    );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.isAuthenticatedSubject.next(false)) // Mark as unauthenticated
    );
  }
}
