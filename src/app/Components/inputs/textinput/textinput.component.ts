import {AfterViewInit, Component, ContentChild, ElementRef, Input, Renderer2} from '@angular/core';
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
export class InputWrapper implements AfterViewInit {
  @Input() label!: string;
  type: string = "text"
  showPassword = false
  @ContentChild('input', {static: false}) inputElement!: ElementRef;
  isFocused = false;
  hasValue = false  ;

  constructor(private renderer: Renderer2) {
  }


  handleShowPassword() {
    this.showPassword = !this.showPassword

    if (this.showPassword) {
      this.inputElement.nativeElement.type = "text"
    } else {
      this.inputElement.nativeElement.type = "password"
    }
  }

  ngAfterViewInit(): void {
    if (this.inputElement) {
      const nativeInput = this.inputElement.nativeElement;
      this.type = nativeInput.type

      this.renderer.listen(nativeInput, 'focus', () => {
        this.isFocused = true;
      });

      this.renderer.listen(nativeInput, 'blur', () => {
        this.isFocused = false;
        this.hasValue = !!nativeInput.value;
        nativeInput.style.border = "";
      });

      this.renderer.listen(nativeInput, 'keydown', (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          nativeInput.style.border = "3px solid var(--Focus)"
        }
      });

      this.renderer.listen(nativeInput, 'mousedown', () => {
        nativeInput.style.border = "3px solid var(--Main)"
      });

      this.hasValue = !!nativeInput.value;
    }
  }
}
