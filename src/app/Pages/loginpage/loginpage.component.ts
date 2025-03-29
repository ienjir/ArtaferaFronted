import { Component, inject } from '@angular/core';
import { NavigationBar } from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import { FloatingLabelComponent } from "../../Components/inputs/textinput/textinput.component";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TranslocoPipe } from "@jsverse/transloco";
import { AuthService } from "../../Services/auth/auth.service";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'LoginPage',
  standalone: true,
  imports: [
    NavigationBar,
    FloatingLabelComponent,
    ReactiveFormsModule,
    TranslocoPipe,
    HttpClientModule,
    NgOptimizedImage
  ],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss'
})
export class LoginPage {
  private authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  data: any;

  constructor(private http: HttpClient) {}

  fetchProtectedData() {
    this.http.get('http://localhost:8080/user/getByID/1').subscribe({
      next: (response) => (this.data = response),
      error: (error) => console.error('Error fetching protected data:', error),
    });
  }

  submitLogin() {
    if (this.loginForm.invalid) {
      console.warn("Invalid form data");
      return;
    }

    const { email, password } = this.loginForm.value as { email: string; password: string };

    this.authService.login(email, password).subscribe({
      next: response => console.log("Login successful:", response),
      error: err => console.error("Login failed:", err)
    });
  }
}
