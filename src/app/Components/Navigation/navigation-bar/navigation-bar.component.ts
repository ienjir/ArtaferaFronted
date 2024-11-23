import { Component } from '@angular/core';

@Component({
  selector: 'NavigationBar',
  standalone: true,
  imports: [],
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
