import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import {provideTranslocoScope, TranslocoPipe} from "@jsverse/transloco";
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import {ImageCarousel} from "../../Components/Imagery/image-carousel/image-carousel.component";
import {Image} from "../../Components/Imagery/image/image.component";

@Component({
  selector: 'Homepage',
  standalone: true,
  imports: [
    CarouselModule,
    TranslocoPipe,
    NavigationBar,
    ImageCarousel,
    Image
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  providers: [provideTranslocoScope('homepage')]
})
export class Homepage {

  carouselSlides: any = [
    {image: "/assets/images/artworks/Ding-Dong/Ding_Dong_Close_Top.jpg", caption: ""},
    {image: "/assets/images/artworks/Windglocke/Windglocke_Frontal_Side.jpg", caption: ""}
  ]
}
