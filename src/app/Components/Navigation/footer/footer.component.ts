import { Component } from '@angular/core';
import {TranslocoPipe} from "@jsverse/transloco";

@Component({
  selector: 'Footer',
  standalone: true,
  imports: [
    TranslocoPipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class Footer {

}
