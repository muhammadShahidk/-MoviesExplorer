import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lazy-load-imag',
  templateUrl: './lazy-load-imag.component.html',
  styleUrls: ['./lazy-load-imag.component.css']
})
export class LazyLoadImagComponent {
  @Input() url?:string;
  @Input()  Classes!:string;

  // if we got new rul the set the flag to false
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['url']) {
      console.log(changes['url'].currentValue);
    this.imageLoadedFlag = false;
    }
  }

  imageLoadedFlag: boolean = false;

  imageLoaded(): void {
    console.log('image loaded');
    this.imageLoadedFlag = true;
  }
}
