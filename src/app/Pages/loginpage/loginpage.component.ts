import { Component } from '@angular/core';
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import {FloatingLabelComponent} from "../../Components/inputs/textinput/textinput.component";

@Component({
  selector: 'LoginPage',
  standalone: true,
  imports: [
    NavigationBar,
    FloatingLabelComponent
  ],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss'
})
export class LoginPage {

}
