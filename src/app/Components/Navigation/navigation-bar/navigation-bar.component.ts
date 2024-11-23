import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TranslocoPipe} from "@jsverse/transloco";

@Component({
  selector: 'NavigationBar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslocoPipe
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBar {
  openSidebar = false;

  toogleSidebar() {
    this.openSidebar = !this.openSidebar;
    console.log(this.openSidebar);
  }
}
