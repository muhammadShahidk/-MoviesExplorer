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

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),

    //create anumation for the movie image to move from left to right when the movie is loaded
    trigger('moveInLeft', [
      transition('void=> *', [style({ transform: 'translateX(300px)' }),
      animate('1s 300ms ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition('*=>void', [style({ transform: 'translateX(0px)' }),
      animate('1s 300ms ease-in-out', style({ transform: 'translateX(-300px)' }))
      ])
    ]),

    //create anumation for the movie image to move from right to left when the image is visible in the viewport
    trigger('moveInRight', [
      transition('void=> *', [style({ transform: 'translateX(-300px)' }),
      animate('1s 300ms ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition('*=>void', [style({ transform: 'translateX(0px)' }),
      animate('1s 300ms ease-in-out', style({ transform: 'translateX(300px)' }))
      ])
    ])

  ],
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

  imageLoaded(): void {
    console.log('image loaded');
    this.imageLoadedFlag = true;
  }
  @Input() movie!: MoveTitleDetails;
}
