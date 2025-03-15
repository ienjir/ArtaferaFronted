import { Component } from '@angular/core';
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";

@Component({
  selector: 'LoginPage',
  standalone: true,
  imports: [
    NavigationBar
  ],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss'
})
export class LoginPage {

}
