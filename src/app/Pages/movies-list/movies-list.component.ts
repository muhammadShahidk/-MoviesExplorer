import { Component, Input, SimpleChanges } from '@angular/core';
import {
  MoviesDbService,
  TitlesOPtions,
} from '../../Services/movies-db.service';
import { MoveTitleDetails, MoviesTitlesPage } from '../../Models/IModels';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent {
  // get this id exampleModal element ref

  constructor(private Moves: MoviesDbService) {}
  @Input() genre!: string;
  // Page!:;
  Movies!: MoveTitleDetails[];
  sportedGenres = this.Moves.sportedGenres;
  Page: page = { page: 0, next: '', entries: 0 };
  nextp: number = 0;

  SelectedMove!: MoveTitleDetails;
  filters: TitlesOPtions = { limit: 10 };

  updateMoviesTitles(
    TitlesOPtions: TitlesOPtions,
    loadSmallSizeMovies: boolean = false
  ) {
    //method to load movies
    let method = loadSmallSizeMovies
      ? this.Moves.getMoviesTitlesWitSizeLimit(TitlesOPtions,1)
      : this.Moves.getMoviesTitles(TitlesOPtions);

    //subscribe to method
    method.subscribe({
      next: (v: MoviesTitlesPage) => {
        // Create console group to store load time of movies
        console.group('Fetching Movies');
        console.time('load-time');
    
        // Process the fetched data
        this.Movies = v.results.filter((x) => x.primaryImage != null);
        this.Page.entries = v.entries;
        this.Page.next = v.next;
        this.Page.page = v.page;
        console.log('page info');
        console.log(this.Page);
    
        
      },
      error: (e) => console.error(e),
      complete: () => {
        // End measuring time after processing the data
        console.log('movies loaded'); console.log(this.Movies);
        console.timeEnd('load-time');
        console.groupEnd();
        console.log("completed");
      }
    });
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['genre']) {
      console.log(changes['genre'].currentValue);

      this.filters.genre = this.genre;
      this.updateMoviesTitles(this.filters, true);
    }
  }

  // when component starts
  ngOnInit(): void {
    this.filters = { genre: 'Action', year: 2022, list: 'most_pop_movies' };
    this.updateMoviesTitles(this.filters);
  }

  nextPage() {
    console.log('fatching next page');
    this.nextp += 1;
    console.log(this.nextp);
    this.filters.page = this.nextp.toString();
    this.updateMoviesTitles(this.filters,true);
  }

  privousPage() {
    console.log('fatching privous page');
    this.nextp -= 1;
    console.log(this.nextp);
    this.filters.page = this.nextp.toString();
    this.updateMoviesTitles(this.filters,true);
  }

  filteredOptions(newOptions: TitlesOPtions) {
    console.log('new options seleted form sidbar ');
    console.log(newOptions);
    this.filters = newOptions;
    this.updateMoviesTitles(newOptions,true);
  }

  ShowDetails(movie: MoveTitleDetails) {
    console.log(movie);
    this.SelectedMove = movie;
  }
}

interface page {
  page: number;
  next: string;
  entries: number;
}
