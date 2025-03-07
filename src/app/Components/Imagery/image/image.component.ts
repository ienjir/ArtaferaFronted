import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'Image',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class Image {
  @Input() Label = ""
}
