import { Component } from '@angular/core';
import { MoveTitleDetails, MoviesTitlesPage } from 'src/app/Models/IModels';
import { GetDataFromApiService } from 'src/app/Services/get-data-from-api.service';
import { MoviesDbService } from 'src/app/Services/movies-db.service';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.css']
})
export class SearchMoviesComponent {
  searchResults!: MoveTitleDetails[];

  constructor(private moviesDbService: MoviesDbService,private moviesDAta:GetDataFromApiService) { }

  searchMovies(event: Event): void {
    let keyword = (event.target as HTMLInputElement).value;
    console.log('keyword:', keyword);
    if (keyword.trim() !== '') {
      this.moviesDbService.searchMoviesByKeyword(keyword).subscribe(
        (results) => {
          // this.searchResults = results.results;
          // this.searchResults = results.results;
          this.moviesDAta.Movies = results.results;
          
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
