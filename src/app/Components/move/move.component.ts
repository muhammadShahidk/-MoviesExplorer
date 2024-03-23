import { Component, HostListener, Input } from '@angular/core';
import { MoveTitleDetails } from '../../Models/IModels';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css'],
  animations: [
    trigger('fadeIn', [
      state('loading', style({ opacity: 0 })),
      state('loaded', style({ opacity: 1 })),
      transition('loading => loaded', animate('2s ease-in')),
      transition('loaded => loading', animate('0.5s ease-out'))
    ])
  ]
})
export class MoveComponent {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  animationState = 'hidden';

  @HostListener('window:scroll')

  checkScroll(): void {
    const componentPosition = document.getElementById('movie-image')?.offsetTop??0;
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition > componentPosition) {
      this.isOpen = false;
    }
  }

  imageLoadedFlag: boolean = false;

   addResizedTextToImageUrl(): string {
    const resizedText = "_V1_FM_UX1000_";
    let imageUrl = this.movie.primaryImage.url; // Assuming `this.movie.primaryImage.url` holds the original image URL.
    console.log('image url: ' + imageUrl);  
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
  

  imageLoaded(): void {
    // console.log(JSON.stringify(this.movie));
    // console.log('image loaded');
    this.imageLoadedFlag = true;
  }
  @Input() movie!: MoveTitleDetails;
}
