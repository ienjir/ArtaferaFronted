import {Component, inject, OnInit} from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import {TranslocoPipe} from "@jsverse/transloco";
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import {ImageCarousel} from "../../Components/Imagery/image-carousel/image-carousel.component";

@Component({
  selector: 'Homepage',
  standalone: true,
  imports: [
    CarouselModule,
    TranslocoPipe,
    NavigationBar,
    ImageCarousel
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class Homepage {
}
