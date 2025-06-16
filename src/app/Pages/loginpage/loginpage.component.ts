import { Component, OnInit, inject } from '@angular/core';
import { NavigationBar } from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import { InputWrapper } from "../../Components/Inputs/textinput/textinput.component";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TranslocoPipe, TranslocoService } from "@jsverse/transloco";
import { AuthService, LoginRequest } from "../../Services/auth/auth.service";
import { NgOptimizedImage } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
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
  styleUrls: ['./loginpage.component.scss']
})
export class LoginPage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private translocoService = inject(TranslocoService);

  emailError = "";
  passwordError = "";
  errorMessage: string = "";
  loading = false;
  testApiResult: any = null;
  returnURL: string = "/";

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnURL = params['returnUrl'] ? decodeURIComponent(params['returnUrl']) : '/';
    });

    if (this.authService.isLoggedIn()) {
      console.log("User logged in")
      if (this.returnURL != "") {
        this.router.navigateByUrl(this.returnURL)
      } else {
        this.router.navigateByUrl("/")
      }
    } else {
      console.log("User not logged in")
    }
  }

  submitLogin() {
    this.emailError = '';
    this.passwordError = '';

    if (this.loginForm.invalid) {
      if (this.loginForm.controls.email.errors) {
        if (this.loginForm.controls.email.errors['required']) {
          this.emailError = this.translocoService.translate("emailRequired");
        } else if (this.loginForm.controls.email.errors['email']) {
          this.emailError = this.translocoService.translate("emailFormat");
        }
      }

      if (this.loginForm.controls.password.errors) {
        if (this.loginForm.controls.password.errors['required']) {
          this.passwordError = this.translocoService.translate("passwordRequired");
        }
      }
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email?.toLowerCase() || '',
      password: this.loginForm.value.password || '',
      rememberMe: this.loginForm.value.rememberMe || false
    };

    this.authService.login(loginRequest).subscribe({
      next: () => {
        console.log("Login successful");
        this.router.navigateByUrl(this.returnURL);
      },
      error: err => {
        console.error("Login failed:", err);

        if (err.status === 404) {
          this.emailError = this.translocoService.translate("emailNotFound");
        } else if (err.status === 401) {
          this.passwordError = this.translocoService.translate("wrongPassword");
        } else {
          this.errorMessage = this.translocoService.translate("unknownError") + err.message;
        }

        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
