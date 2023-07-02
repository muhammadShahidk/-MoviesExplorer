import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { MoviesTitlesPage } from '../Models/IModels';

@Injectable({
  providedIn: 'root',
})
export class MoviesDbService {
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
    | 'Western';
  startYear?: number;
  titleType?: string;
  list?: 'most_pop_movies' | 'most_pop_series' | 'top_rated_series_250';
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
