import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { MoveTitleDetails, MoviesTitlesPage } from '../Models/IModels';

@Injectable({
  providedIn: 'root',
})
export class MoviesDbService {
  BaseUrl = 'https://moviesdatabase.p.rapidapi.com';
  url = `${this.BaseUrl}/titles/utils/genres`;
  headers = new HttpHeaders({
    'X-RapidAPI-Key': '4666a2a4b4msh0cc6166122f407bp14a593jsnfb60d78690cb',
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
  });

  //Sported Genres
  sportedGenres = [
    ,
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Film-Noir',
    'Game-Show',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'News',
    'Reality-TV',
    'Romance',
    'Sci-Fi',
    'Short',
    'Sport',
    'Talk-Show',
    'Thriller',
    'War',
    'Western',
  ];

  constructor(private http: HttpClient) {}

  // catagories
  getMoviesCatagories(): Observable<Response> {
    return this.http.get<Response>(this.url, { headers: this.headers });
  }

  //Movies titles
  getMoviesTitles(options?: TitlesOPtions): Observable<MoviesTitlesPage> {
    this.url = `${this.BaseUrl}/titles`;
    //adding options to url
    if (options) this.url = this.customizeUrl(this.url, options);

    console.log('here is the new url' + this.url);
    return this.http.get<MoviesTitlesPage>(this.url, { headers: this.headers });
  }

  getMoviesTitlesWitSizeLimit(options: TitlesOPtions, maxBannerSizeMb?: number): Observable<MoviesTitlesPage> {
    const customizedUrl = this.customizeUrl(`${this.BaseUrl}/titles`, options);
    
    return this.http.get<MoviesTitlesPage>(customizedUrl, { headers: this.headers }).pipe(
      map((movies: MoviesTitlesPage) => {
        if (maxBannerSizeMb) {
          movies.results = movies.results.filter((movie: MoveTitleDetails) => {
            const bannerSizeMb = movie.primaryImage?.width * movie.primaryImage?.height * 0.000001;
            return bannerSizeMb && bannerSizeMb <= maxBannerSizeMb;
          });
        }
        return movies;
      })
    );
  }

  // ...

  getLocalMoviesTitles(): Observable<MoviesTitlesPage> {
    //getting local movies titles
    const localMoviesTitles = localStorage.getItem('MoviesTitles');

    if (localMoviesTitles == null) {
      return this.getMoviesTitles({
        year: 2022,
        list: 'most_pop_movies',
        limit: 25,
      }).pipe(
        tap((moviesTitles: MoviesTitlesPage) => {
          localStorage.setItem('MoviesTitles', JSON.stringify(moviesTitles));
        })
      );
    } else {
      const moviesTitles: MoviesTitlesPage = JSON.parse(localMoviesTitles);

      return of(moviesTitles);
    }
  }

  // ......................gpt
  // Get upcoming titles
  getUpcomingTitles(): Observable<MoviesTitlesPage> {
    const url = `${this.BaseUrl}/titles/x/upcoming`;
    return this.http.get<MoviesTitlesPage>(url, { headers: this.headers });
  }

  // Get ratings for a title
  getTitleRatings(id: string): Observable<any> {
    const url = `${this.BaseUrl}/titles/${id}/ratings`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  // Get crew for a title
  getTitleCrew(id: string): Observable<any> {
    const url = `${this.BaseUrl}/titles/${id}/crew`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  // Get episodes for a series
  getSeriesEpisodes(
    seriesId: string,
    season?: string
  ): Observable<MoviesTitlesPage> {
    let url = `${this.BaseUrl}/titles/series/${seriesId}`;
    if (season) {
      url += `/${season}`;
    }
    return this.http.get<MoviesTitlesPage>(url, { headers: this.headers });
  }

  // Get details of an episode
  getEpisodeDetails(id: string): Observable<any> {
    const url = `${this.BaseUrl}/titles/episode/${id}`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  // Get main actors for a title
  getMainActors(id: string): Observable<any> {
    const url = `${this.BaseUrl}/titles/${id}/main_actors`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  // Get titles by IDs
  getTitlesByIds(ids: string[]): Observable<MoviesTitlesPage> {
    const url = `${this.BaseUrl}/titles/x/titles-by-ids`;
    const params = { ids: ids.join(',') };
    return this.http.get<MoviesTitlesPage>(url, {
      headers: this.headers,
      params,
    });
  }

  // Get alternate titles for a title
  getAlternateTitles(id: string): Observable<any> {
    const url = `${this.BaseUrl}/titles/${id}/aka`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  // Get a random title
  getRandomTitle(options:TitlesOPtions): Observable<MoviesTitlesPage> {
    let url = `${this.BaseUrl}/titles/random`;
    url = this.customizeUrl(url, options);
    return this.http.get<MoviesTitlesPage>(url, { headers: this.headers });
  }

  // Get details of a title
  getTitleDetails(id: string): Observable<any> {
    const url = `${this.BaseUrl}/titles/${id}`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  // Get all titles
  getAllTitles(): Observable<MoviesTitlesPage> {
    const url = `${this.BaseUrl}/titles`;
    return this.http.get<MoviesTitlesPage>(url, { headers: this.headers });
  }
  //Url customize
  // customizeUrl(url: string, Options: TitlesOPtions): string {
  //   var _OptionsArr = Object.entries(Options).map((x) => `${x[0]}=${x[1]}`);

  //   if (_OptionsArr.length > 0) {
  //     url += `?`;
  //     _OptionsArr.forEach((x) => {
  //       url += `${x}&`;
  //     });
  //     url = url.slice(0, -1);
  //   }
  //   return url;
  // }

  // ----search methods
  // Search movies by keyword
  searchMoviesByKeyword(keyword: string): Observable<MoviesTitlesPage> {
    const url = `${this.BaseUrl}/titles/search/keyword/${keyword}`;
    console.log("url" + url);
    return this.http.get<MoviesTitlesPage>(url, { headers: this.headers });
  }

  // Search movies by title
  searchMoviesByTitle(title: string): Observable<MoviesTitlesPage> {
    const url = `${this.BaseUrl}/titles/search/title/${title}`;
    return this.http.get<MoviesTitlesPage>(url, { headers: this.headers });
  }

  // Get movie lists
  getMovieLists(): Observable<any> {
    const url = `${this.BaseUrl}/titles/utils/lists`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  // Get title types
  getTitleTypes(): Observable<any> {
    const url = `${this.BaseUrl}/titles/utils/titleTypes`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  customizeUrl(url: string, options: TitlesOPtions): string {
    const _OptionsArr = Object.entries(options)
      .filter(([key, value]) => value) // Filter out falsy values
      .map(([key, value]) => `${key}=${value}`); // Construct key-value pairs url parameters

    if (_OptionsArr.length > 0) {
      url += '?' + _OptionsArr.join('&'); // Join key-value pairs with '&'
    }

    return url;
  }
}

export interface Response {
  results: [];
}

export interface TitlesOPtions {
  genre?:
    | 'Action'
    | 'Adventure'
    | 'Animation'
    | 'Biography'
    | 'Comedy'
    | 'Crime'
    | 'Documentary'
    | 'Drama'
    | 'Family'
    | 'Fantasy'
    | 'Film-Noir'
    | 'Game-Show'
    | 'History'
    | 'Horror'
    | 'Music'
    | 'Musical'
    | 'Mystery'
    | 'News'
    | 'Reality-TV'
    | 'Romance'
    | 'Sci-Fi'
    | 'Short'
    | 'Sport'
    | 'Talk-Show'
    | 'Thriller'
    | 'War'
    | 'Western'
    | string;
  startYear?: number;
  titleType?: string;
  list?:
    | 'most_pop_movies'
    | 'most_pop_series'
    | 'top_rated_series_250'
    | string;
  year?: number;
  sort?: string;
  page?: string;
  info?: string;
  endYear?: number;
  limit?: number;
}
// 1:"Action"
// 2:"Adult"
// 3:"Adventure"
// 4:"Animation"
// 5:"Biography"
// 6:"Comedy"
// 7:"Crime"
// 8:"Documentary"
// 9:"Drama"
// 10:"Family"
// 11:"Fantasy"
// 12:"Film-Noir"
// 13:"Game-Show"
// 14:"History"
// 15:"Horror"
// 16:"Music"
// 17:"Musical"
// 18:"Mystery"
// 19:"News"
// 20:"Reality-TV"
// 21:"Romance"
// 22:"Sci-Fi"
// 23:"Short"
// 24:"Sport"
// 25:"Talk-Show"
// 26:"Thriller"
// 27:"War"
// 28:"Western"
