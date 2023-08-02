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

  addResizedTextToImageUrl(): string {
    const resizedText = "_V1_FM_UX1000_";
    let imageUrl = this.url??""; // Assuming `this.movie.primaryImage.url` holds the original image URL.
  
    const filenameRegex = /\/([^/]+)(\.jpg)$/i;
    const matches = imageUrl.match(filenameRegex);
  
    if (matches && matches.length === 3) {
      const [, filenamePart, fileExtension] = matches;
      if (!filenamePart.includes(resizedText)) {
        const newImageUrl = imageUrl.replace(filenamePart + fileExtension, filenamePart + resizedText + fileExtension);
        return newImageUrl;
      }
    }
  
    return imageUrl;
  }
  
}
