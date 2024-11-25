import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'ImageCarousel',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss'
})
export class ImageCarousel {
  currentSlideIndex = 0;

  slides: {image: string, caption: string}[] = [];

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }
}
