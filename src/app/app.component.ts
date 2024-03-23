import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MoviesDbService } from './Services/movies-db.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('sidebarAnimation', [
      state('open', style({
        transform: 'translateX(0)',
      
      })),
      state('closed', style({
        transform: 'translateX(-100%)'
      })),
      transition('open <=> closed', [
        animate('0.3s')
      ])
    ])
  ]
})
export class AppComponent {
  title = 'MovesExplorer';
  SelectedGenre!:string
  MoviesCatagories!:[];
  selectedCatagory!:string;
  isSidbarOpend :boolean = false;

  constructor(private Db: MoviesDbService) { }

  getData(){
    // this.MoviesCatagories
    this.Db.getMoviesCatagories().subscribe({
      next: (v) => this.MoviesCatagories = v.results,
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
    this.Db.getMoviesCatagories().subscribe()
  }


  sideBarResponse(event: string) {
    console.log(event);
    
    this.selectedCatagory = event;
    return false;
  }
}
