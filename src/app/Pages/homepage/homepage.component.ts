import {Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import {TranslocoPipe, TranslocoService} from "@jsverse/transloco";
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import {ImageCarousel} from "../../Components/Display/image-carousel/image-carousel.component";
import {NgOptimizedImage} from "@angular/common";
import {ArtPreview} from "../../Components/Display/art-preview/art-preview.component";
import {Footer} from "../../Components/Navigation/footer/footer.component";

@Component({
  selector: 'Homepage',
  standalone: true,
  imports: [
    CarouselModule,
    TranslocoPipe,
    NavigationBar,
    ImageCarousel,
    NgOptimizedImage,
    ArtPreview,
    Footer
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class Homepage {
  private translocoService = inject(TranslocoService);
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
