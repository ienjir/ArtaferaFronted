import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslocoPipe} from '@jsverse/transloco';
import {InputWrapper} from '@components/input-wrapper/input-wrapper';
import {AuthService} from '@services/auth-service/auth-service';
import {ToastService} from '@services/toast-service/toast-service';
import {finalize} from 'rxjs';

type AuthMode = 'login' | 'signup';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    TranslocoPipe,
    InputWrapper
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toastService = inject(ToastService);

  readonly mode = signal<AuthMode>('login');
  readonly isSubmitting = signal(false);

  firstnameError = '';
  lastnameError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';

  authForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('')
  });

  toggleMode() {
    this.mode.set(this.mode() === 'login' ? 'signup' : 'login');
    this.authForm.reset();
    this.clearErrors();
  }

  submit() {
    this.clearErrors();
    this.authForm.markAllAsTouched();

    if (!this.validateForm()) {
      return;
    }

    if (this.mode() === 'signup') {
      this.submitSignup();
    } else {
      this.submitLogin();
    }
  }

  private validateForm(): boolean {
    const {firstname, lastname, email, password, confirmPassword} = this.authForm.controls;
    const isSignup = this.mode() === 'signup';
    let isValid = true;

    if (isSignup && !(firstname.value ?? '').trim()) {
      this.firstnameError = 'firstnameRequired';
      isValid = false;
    }

    if (isSignup && !(lastname.value ?? '').trim()) {
      this.lastnameError = 'lastnameRequired';
      isValid = false;
    }

    if (email.hasError('required')) {
      this.emailError = 'emailRequired';
      isValid = false;
    } else if (email.hasError('email')) {
      this.emailError = 'emailFormat';
      isValid = false;
    }

    if (password.hasError('required')) {
      this.passwordError = 'passwordRequired';
      isValid = false;
    }

    if (isSignup && (password.value ?? '') !== (confirmPassword.value ?? '')) {
      this.confirmPasswordError = 'passwordMismatch';
      isValid = false;
    }

    return isValid;
  }

  private clearErrors() {
    this.firstnameError = '';
    this.lastnameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
  }

  private submitLogin() {
    const email = (this.authForm.controls.email.value ?? '').trim().toLowerCase();
    const password = (this.authForm.controls.password.value ?? '').trim();

    this.isSubmitting.set(true);
    this.authService.login(email, password).pipe(
      finalize(() => this.isSubmitting.set(false))
    ).subscribe({
      next: () => this.navigateToReturnUrl(),
      error: () => {
        this.toastService.error('unknownError');
      }
    });
  }

  private submitSignup() {
    const firstname = (this.authForm.controls.firstname.value ?? '').trim();
    const lastname = (this.authForm.controls.lastname.value ?? '').trim();
    const email = (this.authForm.controls.email.value ?? '').trim().toLowerCase();
    const password = (this.authForm.controls.password.value ?? '').trim();

    this.isSubmitting.set(true);
    this.authService.register({firstname, lastname, email, password}).pipe(
      finalize(() => this.isSubmitting.set(false))
    ).subscribe({
      next: () => this.navigateToReturnUrl(),
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.toastService.error('emailAlreadyInUse');
        } else if (err.status === 422) {
          this.toastService.error('passwordInsecure');
        } else {
          this.toastService.error('unknownError');
        }
      }
    });
  }

  private navigateToReturnUrl() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
    this.router.navigateByUrl(returnUrl);
  }
}
