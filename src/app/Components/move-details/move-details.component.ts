import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MoveTitleDetails } from 'src/app/Models/IModels';
import { MoviesDbService } from 'src/app/Services/movies-db.service';

@Component({
  selector: 'app-move-details',
  templateUrl: './move-details.component.html',
  styleUrls: ['./move-details.component.css']
})
export class MoveDetailsComponent {
  @Input() Movie?:MoveTitleDetails ;

  //get view child to get the scrollupM
  @ViewChild('scrollupM') scrollupM!: ElementRef;

  // emit event that show movies 
  @Output() ShowMovies = new EventEmitter<string>();
//getting the service
constructor(private db:MoviesDbService) { }

RandomMovies!:MoveTitleDetails[];

ngOnChanges(changes: SimpleChanges): void {
  if (changes['Movie']) {
  this.get();
}
}

ngOnInit(): void {
  this.get();
}
get(){

 let yeaer =this. generateRandomYear(this.Movie?.releaseYear.year??0);
  this.db.getMoviesTitles({year:yeaer,list:"most_pop_movies", limit:20}).subscribe((v)=>{
    this.RandomMovies = v.results;
    console.log(v)
    console.log("do we have results")
    console.log(v.results);
    console.log("do we have results")
  });
}
 generateRandomYear(inputYear: number): number {
  const currentYear: number = new Date().getFullYear();
  const maxYear: number = currentYear // Maximum year cannot exceed 5 years ago or the input year
  const minYear: number = maxYear - 5; // Minimum year is 5 years before the maximum year

  return Math.floor(Math.random() * (maxYear - minYear + 1) + minYear);
}

// Usage examp
ShowMove(m:MoveTitleDetails){
  this.Movie = m;
  console.log("Movie Url");
  console.log(this.Movie?.primaryImage?.url);
  console.log(this.Movie);
  // Scroll to the top of the page scrollupM
  (this.scrollupM.nativeElement as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });

  // emit event that show movies
  this.ShowMovies.emit(this.Movie?.id??"");
  // Scroll to the top of the page
}

 getIMDbURL() {
  const baseURL = 'https://www.imdb.com/title/';
  return `${baseURL}${this.Movie?.id}/`;
}

addResizedTextToImageUrl(): string {
  const resizedText = "_V1_FM_UX1000_";
  let imageUrl = this.Movie?.primaryImage.url??""; // Assuming `this.movie.primaryImage.url` holds the original image URL.

  const filenameRegex = /\/([^/]+)(\.jpg)$/i;
  const matches = imageUrl.match(filenameRegex);

  if (matches && matches.length === 3) {
    const [, filenamePart, fileExtension] = matches;
    if (!filenamePart.includes(resizedText)) {
      const newImageUrl = imageUrl.replace(filenamePart + fileExtension, filenamePart + resizedText + fileExtension);
      return newImageUrl;
    }
  }

  return imageUrl;
}



}
