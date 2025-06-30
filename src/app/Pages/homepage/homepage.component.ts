import {Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import {TranslocoPipe, TranslocoService} from "@jsverse/transloco";
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import {ImageCarousel} from "../../Components/Display/image-carousel/image-carousel.component";
import {NgOptimizedImage} from "@angular/common";
import {ArtPreview} from "../../Components/Display/art-preview/art-preview.component";
import {Footer} from "../../Components/Navigation/footer/footer.component";
import {SectionComponent} from "../../Components/Display/section/section.component";
import {Router} from "@angular/router";

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
    Footer,
    SectionComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class Homepage {
  private platformId = inject(PLATFORM_ID);
  constructor(private router: Router) {
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }
}
