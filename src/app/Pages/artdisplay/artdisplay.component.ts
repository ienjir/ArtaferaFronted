import {Component} from '@angular/core';
import {ArtPreview} from "../../Components/Display/art-preview/art-preview.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'ArtDisplayComponent',
  standalone: true,
  imports: [
    ArtPreview,
    NgForOf
  ],
  templateUrl: './artdisplay.component.html',
  styleUrl: './artdisplay.component.scss'
})
export class ArtDisplayComponent {
  fakedata = [
    {title: 'Test1', pictureUrl: '/assets/images/ding-dong3.jpg', pictureAlt: 'test', label: 'test'},
    {title: 'Test2', pictureUrl: '/assets/images/ding-dong3.jpg', pictureAlt: 'test', label: 'test'},
    {title: 'Test3', pictureUrl: '/assets/images/ding-dong3.jpg', pictureAlt: 'test', label: 'test'},
    {title: 'Test4', pictureUrl: '/assets/images/ding-dong3.jpg', pictureAlt: 'test', label: 'test'},
    {title: 'Test5', pictureUrl: '/assets/images/ding-dong3.jpg', pictureAlt: 'test', label: 'test'},
    {title: 'Test6', pictureUrl: '/assets/images/ding-dong3.jpg', pictureAlt: 'test', label: 'test'},
    {title: 'Test7', pictureUrl: '/assets/images/ding-dong3.jpg', pictureAlt: 'test', label: 'test'},
  ];
}
