import { Component } from '@angular/core';
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import {FloatingLabelComponent} from "../../Components/inputs/textinput/textinput.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TranslocoPipe} from "@jsverse/transloco";

@Component({
  selector: 'LoginPage',
  standalone: true,
  imports: [
    NavigationBar,
    FloatingLabelComponent,
    ReactiveFormsModule,
    TranslocoPipe
  ],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss'
})
export class LoginPage {
  loginForm = new FormGroup({

    email: new FormControl(''),
    password: new FormControl(''),
  })
}
