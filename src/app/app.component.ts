import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Artafera';

  changeFavicon(darkMode: boolean): void {
    const favicon = document.getElementById('app-favicon') as HTMLLinkElement;
    if (favicon) {
      favicon.href = darkMode
        ? 'assets/favicon-dark.ico'
        : 'assets/favicon-light.ico';
    }
  }
}
