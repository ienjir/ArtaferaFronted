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
  @Input() pictureLink: string = ""
  @Input() pictureAlt: string = ""
  @Input() pictureTitle: string = ""
  @Input() pictureLabel: string = ""

}
