import {Component, Input} from '@angular/core';

@Component({
  selector: 'ArtPreview',
  standalone: true,
  imports: [],
  templateUrl: './art-preview.component.html',
  styleUrl: './art-preview.component.scss'
})
export class ArtPreview {
  @Input() pictureLink: string = ""
  @Input() pictureAlt: string = ""
  @Input() pictureTitle: string = ""
  @Input() pictureLabel: string = ""

}
