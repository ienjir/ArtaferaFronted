import { Component } from '@angular/core';
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import {InputWrapper} from "../../Components/Inputs/textinput/textinput.component";
import {TranslocoPipe} from "@jsverse/transloco";
import {NgOptimizedImage} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginRequest} from "../../Services/auth/auth.service";

@Component({
  selector: 'ContactPage',
  standalone: true,
  imports: [
    NavigationBar,
    InputWrapper,
    TranslocoPipe,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contactpage.component.html',
  styleUrl: './contactpage.component.scss'
})
export class ContactPageComponent {
  emailError = "";
  passwordError = "";

  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  submitLogin() {
    this.emailError = 'This feature is currently being implemented';
    this.passwordError = 'This feature is currently being implemented';
  }
}
