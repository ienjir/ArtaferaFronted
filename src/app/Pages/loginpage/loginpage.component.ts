import { Component, inject } from '@angular/core';
import { NavigationBar } from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import { FloatingLabelComponent } from "../../Components/inputs/textinput/textinput.component";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TranslocoPipe } from "@jsverse/transloco";
import { AuthService } from "../../Services/login/auth-service.service";
import { Observable } from "rxjs";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'LoginPage',
  standalone: true,
  imports: [
    NavigationBar,
    FloatingLabelComponent,
    ReactiveFormsModule,
    TranslocoPipe,
    HttpClientModule // Ensure HttpClientModule is imported
  ],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss'
})
export class LoginPage {
  private authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitLogin() {
    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.authService.postLogin(email, password).subscribe({
        next: response => console.log("Login successful:", response),
        error: err => console.error("Login failed:", err)
      });
    }
  }
}
