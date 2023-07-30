import { Component, Input, SimpleChanges } from '@angular/core';
import {
  MoviesDbService,
  TitlesOPtions,
} from '../../Services/movies-db.service';
import { MoveTitleDetails, MoviesTitlesPage } from '../../Models/IModels';
import { FiltersService } from 'src/app/Services/filters.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent {
  // get this id exampleModal element ref
  private dataSubscription: Subscription;

  constructor(private Moves: MoviesDbService, public filterService:FiltersService) {
    // console.log("data form sevice " + this.filterService.sidbarGenere);
    // this.genere2 = this.filterService.sidbarGenere

    //checking if the genra is changed form the sidebar or not 
    this.dataSubscription = this.filterService.sidbarGenere$.subscribe((data) => {
      this.genre = data;
      
      if (this.genre.length > 0) {
        // reset the page
        this.filters.page = '1';
        this.filters.genre = this.genre;
        this.updateMoviesTitles(this.filters);
        console.log("genra changes")
      }
    });
  }
  @Input() genre: string = "";

  
  // Page!:;
  Movies!: MoveTitleDetails[];
  sportedGenres = this.Moves.sportedGenres;
  Page: page = { page: 0, next: '', entries: 0 };
  nextp: number = 1;

  SelectedMove!: MoveTitleDetails;
  filters: TitlesOPtions = { limit: 10 };

  updateMoviesTitles(
    TitlesOPtions: TitlesOPtions,
    loadSmallSizeMovies: boolean = false,
    appendToMovies:boolean = false
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
        let append = appendToMovies
          ? v.results.filter((x) => x.primaryImage != null).forEach(x => this.Movies.push(x))
          : this.Movies = v.results.filter((x) => x.primaryImage != null);

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
      debugger
      this.filters.genre = this.genre;
      this.updateMoviesTitles(this.filters);
    }
  }

  ngOnDestroy() {
    // Don't forget to unsubscribe to prevent memory leaks.
    debugger
    this.dataSubscription.unsubscribe();
  }

  // when component starts
  ngOnInit(): void {
    this.filters = { genre: 'Action', year: 2022, list: 'most_pop_movies' };
    this.updateMoviesTitles(this.filters);
  }


  // loead more
  loadMore(){
    console.log('fatching data');
    this.nextp += 1;
    console.log(this.nextp);
    this.filters.page = this.nextp.toString();
    this.updateMoviesTitles(this.filters,false,true);
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
