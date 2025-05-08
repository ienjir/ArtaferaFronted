import {Component, inject, OnInit} from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import {TranslocoPipe, TranslocoService} from "@jsverse/transloco";
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import {ImageCarousel} from "../../Components/Display/image-carousel/image-carousel.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'Homepage',
  standalone: true,
  imports: [
    CarouselModule,
    TranslocoPipe,
    NavigationBar,
    ImageCarousel,
    NgOptimizedImage
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class Homepage {
  private translocoService = inject(TranslocoService);

  scrollToNavbar() {
    const element = document.getElementById('NavigationBar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
