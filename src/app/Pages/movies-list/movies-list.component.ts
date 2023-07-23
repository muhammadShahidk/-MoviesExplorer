import { Component, Input, SimpleChanges } from '@angular/core';
import { MoviesDbService, TitlesOPtions } from '../../Services/movies-db.service';
import { MoveTitleDetails, MoviesTitlesPage } from '../../Models/IModels';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent {
  // get this id exampleModal element ref

  constructor(private Moves:MoviesDbService) { }
  @Input() genre!:string;
  // Page!:;
  MoviesTitles!:MoveTitleDetails[]
  sportedGenres = this.Moves.sportedGenres;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['genre']) {
     console.log(changes['genre'].currentValue);
     this.Moves.getMoviesTitles({genre:this.genre,page:'1',year:2001,list:'most_pop_movies',limit:10}).subscribe( {
      next: (v:MoviesTitlesPage) => this.MoviesTitles = v.results.filter((x)=>x.primaryImage != null),
      error: (e) => console.error(e),
      complete: () => console.log(this.MoviesTitles)
      // console.log(this.MoviesTitles.Results.map((x)=>x.titleText.text));
    });
    }
  }

  ngOnInit(): void {
    this.Moves.getMoviesTitlesWitSizeLimit({genre:'Action',page:'1',year:2001,list:'most_pop_movies',limit:10},0.5).subscribe( {
      next: (v:MoviesTitlesPage) => this.MoviesTitles = v.results.filter((x)=>x.primaryImage != null),
      error: (e) => console.error(e),
      complete: () => console.log(this.MoviesTitles)
      // console.log(this.MoviesTitles.Results.map((x)=>x.titleText.text));
    });  

    //  this.Moves.getLocalMoviesTitles().subscribe( r=>this.MoviesTitles = r.results.filter((x)=>x.primaryImage != null));

     const localMoviesTitles = localStorage.getItem('MoviesTitles');
    // this.MoviesTitles = JSON.parse(localMoviesTitles);
    //  const moviesTitles: MoviesTitlesPage = JSON.parse(localMoviesTitles?localMoviesTitles:'');
    //   this.MoviesTitles = moviesTitles.results.filter((x)=>x.primaryImage != null);
    //   console.log(this.MoviesTitles);
    //   console.log("here is the local movies titles");
  }
  
  filteredOptions(newOptions:TitlesOPtions){
    console.log(newOptions);
    // debugger;
    this.Moves.getMoviesTitles(newOptions).subscribe( {
      next: (v:MoviesTitlesPage) => this.MoviesTitles = v.results.filter((x)=>x.primaryImage != null),
      error: (e) => console.error(e),
      complete: () => console.log(this.MoviesTitles)
      // console.log(this.MoviesTitles.Results.map((x)=>x.titleText.text));
    });
  }

  SelectedMove!:MoveTitleDetails;
  // show details
  ShowDetails(movie:MoveTitleDetails){
    console.log(movie)
    this.SelectedMove = movie;
    //this.SelectedMove.originalTitleText.text
    
  }
    

  

}
