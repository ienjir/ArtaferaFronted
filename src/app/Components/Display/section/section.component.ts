import {Component, Input} from '@angular/core';
import {TranslocoPipe} from "@jsverse/transloco";

@Component({
  selector: 'Section-Component',
  standalone: true,
  imports: [
    TranslocoPipe
  ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  @Input({ required: true }) titleKey!: string;
  @Input() centered: boolean = false;
}
