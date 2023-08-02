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
//getting the service
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
  console.log("Movie Url");
  console.log(this.Movie?.primaryImage?.url);
  console.log(this.Movie);
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
