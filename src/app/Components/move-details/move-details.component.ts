import { Component, Input, SimpleChanges } from '@angular/core';
import { MoveTitleDetails } from 'src/app/Models/IModels';
import { MoviesDbService } from 'src/app/Services/movies-db.service';

@Component({
  selector: 'app-move-details',
  templateUrl: './move-details.component.html',
  styleUrls: ['./move-details.component.css']
})
export class MoveDetailsComponent {
  @Input() Movie?:MoveTitleDetails ;
constructor(private db:MoviesDbService) { }
RandomMovies!:MoveTitleDetails[];

ngOnChanges(changes: SimpleChanges): void {
  if (changes['RandomMovies']) {
    debugger
  this.get();
}
}

// ngOnInit(): void {
//   this.get();
// }
get(){
  this.db.getMoviesTitlesWitSizeLimit({ limit:50},1).subscribe((v)=>{
    this.RandomMovies = v.results;
    console.log(v)
    console.log("do we have results")
    console.log(v.results);
    console.log("do we have results")
  });
}

ShowMove(m:MoveTitleDetails){
  this.Movie = m;
  console.log(this.Movie);
}
}
