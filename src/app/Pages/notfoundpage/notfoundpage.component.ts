import {Component, inject} from '@angular/core';
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import {TranslocoPipe, TranslocoService} from "@jsverse/transloco";
import {Router} from "@angular/router";

@Component({
  selector: 'NotFoundPage',
  standalone: true,
  imports: [
    NavigationBar,
    TranslocoPipe
  ],
  templateUrl: './notfoundpage.component.html',
  styleUrl: './notfoundpage.component.scss'
})
export class NotFoundPageComponent {
  constructor(private router: Router) {
  }

  redirectTo() {
    this.router.navigate(['/']);
  }
}
