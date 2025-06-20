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
  @Input() resizable: boolean = true; // Controls if textarea can be resized

  type: string = "text";
  showPassword = false;

  // Support both input and textarea
  @ContentChild('input', {static: false}) inputElement!: ElementRef;
  @ContentChild('textarea', {static: false}) textareaElement!: ElementRef;

  isFocused = false;
  hasValue = false;

  // Getter to get the active element (input or textarea)
  get activeElement(): ElementRef | null {
    return this.inputElement || this.textareaElement || null;
  }

  // Getter to check if this is a textarea
  get isTextarea(): boolean {
    return !!this.textareaElement;
  }

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
    const activeEl = this.activeElement;

    if (activeEl) {
      const nativeElement = activeEl.nativeElement;

      // Set type only for input elements
      if (!this.isTextarea) {
        this.type = nativeElement.type;
      } else {
        this.type = "textarea";
      }

      // Focus event listener
      this.renderer.listen(nativeElement, 'focus', () => {
        this.zone.run(() => {
          this.isFocused = true;
        });
      });

      // Blur event listener
      this.renderer.listen(nativeElement, 'blur', () => {
        this.zone.run(() => {
          this.isFocused = false;
          this.hasValue = !!nativeElement.value;
          nativeElement.style.border = "";
        });
      });

      // Keyboard event listeners
      this.renderer.listen(nativeElement, 'keydown', (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          nativeElement.style.border = "3px solid var(--Focus)";
        }
      });

      this.renderer.listen(nativeElement, 'mousedown', () => {
        nativeElement.style.border = "3px solid var(--Main)";
      });

      // Apply resize styles for textarea
      if (this.isTextarea) {
        const resizeValue = this.resizable ? 'vertical' : 'none';
        this.renderer.setStyle(nativeElement, 'resize', resizeValue);
      }
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.zone.run(() => {
            this.hasValue = !!nativeElement.value;
          });
        });
      });
    }
  }
}
