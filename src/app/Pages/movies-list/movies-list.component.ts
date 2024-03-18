import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
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
UpdateTest() {

  this.test += 3;
  console.log("test updated");
}
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
  //get the my modal element ref
  @ViewChild("myModal") myModal!: ElementRef;
  test=0;
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
    appendToMovies:boolean = false,
    isSearching:boolean = false,
    searchkeywork:string = ""
  ) {
    //method to load movies
    let method;
    if(!isSearching){
     method = loadSmallSizeMovies
      ? this.Moves.getMoviesTitlesWitSizeLimit(TitlesOPtions,1)
      : this.Moves.getMoviesTitles(TitlesOPtions);
    }
    else{ 
      method = this.Moves.searchMoviesByTitle(searchkeywork,TitlesOPtions);
    }
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
        return this.Movies;
      }
    });
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['genre']) {
      console.log(changes['genre'].currentValue);
      this.filters.genre = this.genre;
      this.updateMoviesTitles(this.filters);
    }
  }

  ngOnDestroy() {
    // Don't forget to unsubscribe to prevent memory leaks.
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

  ScrollUP(){
    // debugger
  }
  

  //search
  i = 0;
  OldMovies!:MoveTitleDetails[] ;
  OldFilters!:TitlesOPtions;
  Search(search: string) {
    // debugger
   if(this.i == 0){this.OldMovies = this.Movies; this.OldFilters = this.filters;}
    if(search){
      console.log(search);
      // this.filters.search = search;
      this.filters = {};
      this.filters.limit = 50;
      this.updateMoviesTitles(this.filters,false,false,true,search);
      this.i++;
    }
    else{
      console.log("search is empty")
      this.Movies = this.OldMovies?? this.Movies;
      this.filters = this.OldFilters?? this.filters;
      this.i = 0;
    }
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
