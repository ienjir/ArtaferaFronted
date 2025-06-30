import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'AboutMePageComponent',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './aboutmepage.component.html',
  styleUrl: './aboutmepage.component.scss'
})
export class AboutMePageComponent {

}
