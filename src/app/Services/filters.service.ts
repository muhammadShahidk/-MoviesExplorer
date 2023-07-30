import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
   sidbarGenere:string = "";
   private sharedDataSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.sidbarGenere);
   sidbarGenere$ = this.sharedDataSubject.asObservable();

   
   updateGenere(up:string){
    this.sharedDataSubject.next(up);
   }
  constructor() { }
}
