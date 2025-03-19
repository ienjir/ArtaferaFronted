import {AfterViewInit, Component, ContentChild, ElementRef, Input, Renderer2} from '@angular/core';

@Component({
  selector: 'Textinput',
  standalone: true,
  imports: [],
  templateUrl: './textinput.component.html',
  styleUrl: './textinput.component.scss'
})
export class FloatingLabelComponent implements AfterViewInit {
  @Input() label!: string;
  @ContentChild('input', { static: false }) inputElement!: ElementRef;
  isFocused = false;
  hasValue = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.inputElement) {
      const nativeInput = this.inputElement.nativeElement;

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
