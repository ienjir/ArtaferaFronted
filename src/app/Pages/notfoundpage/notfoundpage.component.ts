import { Component } from '@angular/core';
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";

@Component({
  selector: 'NotFoundPage',
  standalone: true,
  imports: [
    NavigationBar
  ],
  templateUrl: './notfoundpage.component.html',
  styleUrl: './notfoundpage.component.scss'
})
export class NotFoundPageComponent {

}
