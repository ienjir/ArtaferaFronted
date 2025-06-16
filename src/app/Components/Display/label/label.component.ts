import {Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'Label',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss'
})
export class Label {
  @Input() label: string = ""
  @Input() color: string = "var(--Accent1)"
}
