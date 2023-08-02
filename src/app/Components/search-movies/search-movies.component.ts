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
    const keyword = (event.target as HTMLInputElement).value.trim();
    console.log('keyword:', keyword);

    if (keyword !== '') {
      debugger
      this.moviesDbService.searchMoviesByTitle(keyword).subscribe({
        next: (results) => {
          this.searchResults = results.results.filter((x) => x.primaryImage != null);
          console.log('searchResults:',this. searchResults);
        },
        error: (error) => {
          console.log('Error occurred while searching movies:', error);
        },
        complete: () => {
          console.info('complete');
        }
      });
    } else {
      this.searchResults = [];
    }
  }
}
