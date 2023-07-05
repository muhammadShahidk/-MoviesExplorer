import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { MoviesTitlesPage } from '../Models/IModels';

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
    'Adult',
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
    | 'Adult'
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
