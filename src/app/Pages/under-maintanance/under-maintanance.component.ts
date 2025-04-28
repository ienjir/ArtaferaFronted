import {Component, inject} from '@angular/core';
import {TranslocoPipe, TranslocoService} from "@jsverse/transloco";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-under-maintanance',
  standalone: true,
  imports: [
    TranslocoPipe,
    NgOptimizedImage
  ],
  templateUrl: './under-maintanance.component.html',
  styleUrl: './under-maintanance.component.scss'
})
export class UnderMaintananceComponent {
  private translocoService = inject(TranslocoService);

}
