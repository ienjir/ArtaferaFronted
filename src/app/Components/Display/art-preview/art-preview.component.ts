import {Component, Input} from '@angular/core';
import {Label} from "../label/label.component";

@Component({
  selector: 'ArtPreview',
  standalone: true,
  imports: [
    Label
  ],
  templateUrl: './art-preview.component.html',
  styleUrl: './art-preview.component.scss'
})
export class ArtPreview {
  @Input({required: true}) pictureLink: string = ""
  @Input({required: true}) pictureAlt: string = ""
  @Input({required: true}) pictureTitle: string = ""
  @Input({required: true}) pictureLabel: string = ""
}
