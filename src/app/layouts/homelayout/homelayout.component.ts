import {Component, inject, PLATFORM_ID} from '@angular/core';
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import {RouterOutlet} from "@angular/router";
import {ImageCarousel} from "../../Components/Display/image-carousel/image-carousel.component";
import {TranslocoPipe} from "@jsverse/transloco";
import {isPlatformBrowser, NgOptimizedImage} from "@angular/common";
import {Footer} from "../../Components/Navigation/footer/footer.component";

@Component({
  selector: 'app-homelayout',
  standalone: true,
  imports: [
    NavigationBar,
    RouterOutlet,
    ImageCarousel,
    TranslocoPipe,
    NgOptimizedImage,
    Footer
  ],
  templateUrl: './homelayout.component.html',
  styleUrl: './homelayout.component.scss'
})
export class HomelayoutComponent {
  private platformId = inject(PLATFORM_ID);

  scrollToNavbar() {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById('NavigationBar');
      if (element) {
        element.scrollIntoView({behavior: 'smooth'});
      }
    }
  }
}
