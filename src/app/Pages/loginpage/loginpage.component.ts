import { Component, inject } from '@angular/core';
import { NavigationBar } from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import { InputWrapper } from "../../Components/inputs/textinput/textinput.component";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TranslocoPipe } from "@jsverse/transloco";
import { AuthService, LoginRequest } from "../../Services/auth/auth.service";
import { NgOptimizedImage } from "@angular/common";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'LoginPage',
  standalone: true,
  imports: [
    NavigationBar,
    InputWrapper,
    ReactiveFormsModule,
    TranslocoPipe,
    NgOptimizedImage
  ],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss'
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage: string = '';
  loading = false;
  testApiResult: any = null;

  submitLogin() {
    if (this.loginForm.invalid) {
      console.warn("Invalid form data");
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    };

    this.authService.login(loginRequest).subscribe({
      next: () => {
        console.log("Login successful");

        this.testProtectedEndpoint();

        this.router.navigate(['/']);
      },
      error: err => {
        console.error("Login failed:", err);
        this.errorMessage = err.message || 'Login failed. Please check your credentials.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  testProtectedEndpoint() {
    const baseUrl = 'http://localhost:8080';

    this.http.get(`${baseUrl}/user/getByID/1`, { withCredentials: true }).subscribe({
      next: (response) => {
        console.log('Protected API test successful:', response);
        this.testApiResult = response;

        alert('Protected API call successful! See console for details.');
      },
      error: (error) => {
        console.error('Protected API test failed:', error);
        alert(`Protected API call failed: ${error.message || 'Unknown error'}`);
      }
    });
  }

  fetchProtectedData() {
    if (!this.authService.isLoggedIn()) {
      console.warn('User not logged in. Please login first.');
      return;
    }

    this.authService.getUsers().subscribe({
      next: (userInfo) => {
        console.log("User info:", userInfo);
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }
}
