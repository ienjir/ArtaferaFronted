import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import {TranslocoPipe} from "@jsverse/transloco";

@Component({
  selector: 'Homepage',
  standalone: true,
  imports: [
    CarouselModule,
    TranslocoPipe
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class Homepage {

}
