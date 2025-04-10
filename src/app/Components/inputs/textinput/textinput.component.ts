import {AfterViewInit, Component, ContentChild, ElementRef, Input, NgZone, OnInit, Renderer2} from '@angular/core';
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {TranslocoPipe} from "@jsverse/transloco";

@Component({
  selector: 'InputWrapper',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    TranslocoPipe
  ],
  templateUrl: './textinput.component.html',
  styleUrl: './textinput.component.scss'
})
export class InputWrapper implements OnInit, AfterViewInit {
  @Input() label!: string;
  @Input() errorMessage!: string;

  type: string = "text";
  showPassword = false;
  @ContentChild('input', {static: false}) inputElement!: ElementRef;

  isFocused = false;
  hasValue = false;

  constructor(private renderer: Renderer2, private zone: NgZone) {}

  ngOnInit(): void { }

  handleShowPassword(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.showPassword = !this.showPassword;
    if (this.inputElement) {
      if (this.showPassword) {
        this.inputElement.nativeElement.type = "text";
      } else {
        this.inputElement.nativeElement.type = "password";
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.inputElement) {
      const nativeInput = this.inputElement.nativeElement;

      this.type = nativeInput.type;

      this.renderer.listen(nativeInput, 'focus', () => {
        this.zone.run(() => {
          this.isFocused = true;
        });
      });

      this.renderer.listen(nativeInput, 'blur', () => {
        this.zone.run(() => {
          this.isFocused = false;
          this.hasValue = !!nativeInput.value;
          nativeInput.style.border = "";
        });
      });

      this.renderer.listen(nativeInput, 'keydown', (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          nativeInput.style.border = "3px solid var(--Focus)";
        }
      });

      this.renderer.listen(nativeInput, 'mousedown', () => {
        nativeInput.style.border = "3px solid var(--Main)";
      });

      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.zone.run(() => {
            this.hasValue = !!nativeInput.value;
          });
        });
      });
    }
  }
}
