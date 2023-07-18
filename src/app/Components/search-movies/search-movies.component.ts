import { Component } from '@angular/core';
import { MoveTitleDetails, MoviesTitlesPage } from 'src/app/Models/IModels';
import { MoviesDbService } from 'src/app/Services/movies-db.service';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.css']
})
export class SearchMoviesComponent {
  searchResults: MoveTitleDetails[] = [];

  constructor(private moviesDbService: MoviesDbService) { }

  searchMovies(event: Event): void {
    let keyword = (event.target as HTMLInputElement).value;
    console.log('keyword:', keyword);
    if (keyword.trim() !== '') {
      this.moviesDbService.searchMoviesByKeyword(keyword).subscribe(
        (results) => {
          this.searchResults = results.results;
          console.log('searchResults:', results);
        },
        (error) => {
          console.log('Error occurred while searching movies:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}
