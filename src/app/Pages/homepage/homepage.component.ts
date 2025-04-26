import {Component, inject, OnInit} from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import {TranslocoPipe} from "@jsverse/transloco";
import {NavigationBar} from "../../Components/Navigation/navigation-bar/navigation-bar.component";
import {ImageCarousel} from "../../Components/Imagery/image-carousel/image-carousel.component";
import {AuthService} from "../../Services/auth/auth.service";

@Component({
  selector: 'Homepage',
  standalone: true,
  imports: [
    CarouselModule,
    TranslocoPipe,
    NavigationBar,
    ImageCarousel
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class Homepage implements OnInit {
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.getUsers().subscribe({
      next: () => {
        console.log(this.authService)
      },
      error: err => {
        console.error(err)
      }
    })
  }
}
