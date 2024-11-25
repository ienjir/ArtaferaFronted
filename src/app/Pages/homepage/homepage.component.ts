import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
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

  slides: {image: string, caption: string}[] = [
    {image: "https://picsum.photos/id/237/2000/3000", caption: "Pic 1"},
    {image: "https://picsum.photos/id/337/2000/3000", caption: "Pic 2"},
    {image: "https://picsum.photos/id/437/2000/3000", caption: "Pic 2"}
  ]
}
