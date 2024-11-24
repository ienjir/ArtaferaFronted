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

  slides = [
    { image: 'https://picsum.photos/id/1/2000/3000', caption: 'Slide 1' },
    { image: 'https://picsum.photos/id/5/2000/3000', caption: 'Slide 2' },
    { image: 'https://picsum.photos/id/87/2000/3000', caption: 'Slide 3' },
  ];

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }
}
