import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAddModalProperties]'
})
export class AddModalPropertiesDirective implements OnInit{

  @Input('addModalProperties')targetId!: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.addProperties();
  }

  private addProperties(): void {
    const element: HTMLElement = this.elementRef.nativeElement;

    element.setAttribute('data-bs-toggle', 'modal');
    if (this.targetId) {
      element.setAttribute('data-bs-target', `#${this.targetId}`);
    }
  }

}
