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
  isFocusVisible = false;
  isFocusClick = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.inputElement) {
      const nativeInput = this.inputElement.nativeElement;

      // Listen for focus from any source
      this.renderer.listen(nativeInput, 'focus', () => {
        console.log("Focused: " + this.isFocused)
        this.isFocused = true;
      });

      // Listen for blur event
      this.renderer.listen(nativeInput, 'blur', () => {
        console.log("Blur");
        this.isFocused = false;
        this.hasValue = !!nativeInput.value;
        this.isFocusVisible = false;
        this.isFocusClick = false;

        // Reset border when losing focus
        nativeInput.style.border = "";
      });

      // Detect focus from keyboard
      this.renderer.listen(nativeInput, 'keydown', (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          this.isFocusVisible = true;
          this.isFocusClick = false;
          nativeInput.style.border = "3px solid green"
          console.log("Keyboard")
          console.log("IsFocusVisible: " + this.isFocusVisible)
          console.log("IsFocusClick: " + this.isFocusClick)
        }
      });

      // Detect focus from mouse
      this.renderer.listen(nativeInput, 'mousedown', () => {
        this.isFocusVisible = false;
        this.isFocusClick = true;
        nativeInput.style.border = "3px solid red"
        console.log("Mouse")
        console.log("IsFocusVisible: " + this.isFocusVisible)
        console.log("IsFocusClick: " + this.isFocusClick)
      });

      // Set initial state
      this.hasValue = !!nativeInput.value;
    }
  }
}
