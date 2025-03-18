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

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.inputElement) {
      this.renderer.listen(this.inputElement.nativeElement, 'focus', () => {
        console.log("ture")
        this.isFocused = true;
      });
      this.renderer.listen(this.inputElement.nativeElement, 'blur', () => {
        this.isFocused = false;
        this.hasValue = !!this.inputElement.nativeElement.value;
      });
      this.hasValue = !!this.inputElement.nativeElement.value;
    }
  }
}
