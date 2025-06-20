import { Component } from '@angular/core';
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import {RouterOutlet} from "@angular/router";
import {Footer} from "../../Components/Navigation/footer/footer.component";

@Component({
  selector: 'DefaultLayout',
  standalone: true,
  imports: [
    NavigationBar,
    RouterOutlet,
    Footer
  ],
  templateUrl: './defaultlayout.component.html',
  styleUrl: './defaultlayout.component.scss'
})
export class DefaultLayoutComponent {

}
