import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
   sidbarGenere:string = "";
   modalMovieChanged:string = "";

   private modalSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.modalMovieChanged);
    modalMovieChanged$ = this.modalSubject.asObservable();

   private sharedDataSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.sidbarGenere);
   sidbarGenere$ = this.sharedDataSubject.asObservable();

   
   updateGenere(up:string){
    this.sharedDataSubject.next(up);
   }

    updateModalMovie(up:string){
    this.modalSubject.next(up); 
    }
    
  constructor() { }
}
