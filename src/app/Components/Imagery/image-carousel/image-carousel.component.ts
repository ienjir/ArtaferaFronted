import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {NgForOf, NgClass, NgIf} from "@angular/common";
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'ImageCarousel',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss',
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('600ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ImageCarousel implements OnInit, OnDestroy {
  currentSlideIndex = 0;
  previousSlideIndex = 0;
  slideDirection = 'next';
  isAnimating = false;
  autoPlayInterval: any;

  @Input() slides: { image: string, caption: string }[] = [
    {image: "/assets/images/ding-dong3.jpg", caption: "Please change me!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"},
    {image: "/assets/images/windBlumeWinter.jpg", caption: "Please change me!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"},
    {image: "/assets/images/schildkröte.jpg", caption: "Please change me!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"},
  ];


  @Input() autoPlay = true;
  @Input() interval = 5000;
  @Input() darkened = false;
  @Input() manualSwap = true;

  ngOnInit() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.interval);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextSlide() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.slideDirection = 'next';
    this.previousSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;

    setTimeout(() => {
      this.isAnimating = false;
    }, 600); // Match this with your CSS transition duration
  }

  prevSlide() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.slideDirection = 'prev';
    this.previousSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;

    setTimeout(() => {
      this.isAnimating = false;
    }, 600); // Match this with your CSS transition duration
  }

  goToSlide(index: number) {
    if (this.isAnimating || index === this.currentSlideIndex) return;

    this.isAnimating = true;
    this.slideDirection = index > this.currentSlideIndex ? 'next' : 'prev';
    this.previousSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex = index;

    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  getSlideClass(index: number) {
    if (index === this.currentSlideIndex) {
      return 'active';
    } else if (this.isAnimating && index === this.previousSlideIndex) {
      return this.slideDirection === 'next' ? 'prev-slide' : 'next-slide';
    } else if (this.isAnimating && index === this.currentSlideIndex) {
      return 'new-active-slide';
    }
    return '';
  }

  // Track mouse events to pause auto-play when user interacts with carousel
  onMouseEnter() {
    if (this.autoPlay) {
      this.stopAutoPlay();
    }
  }

  onMouseLeave() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }
}
