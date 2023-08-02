import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FiltersService } from 'src/app/Services/filters.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
 sidebarOptions = [
  { name: "Action", icon: "bi bi-lightning" },
  { name: "Adventure", icon: "bi bi-compass" },
  { name: "Animation", icon: "bi bi-camera-reels" },
  { name: "Biography", icon: "bi bi-person-badge" },
  { name: "Comedy", icon: "bi bi-emoji-laughing" },
  { name: "Crime", icon: "bi bi-bank2" },
  { name: "Documentary", icon: "bi bi-journal-album" },
  { name: "Drama", icon: "bi bi-droplet-half" },
  { name: "Family", icon: "bi bi-people" },
  { name: "Fantasy", icon: "bi bi-moon-stars" },
  { name: "Film-Noir", icon: "bi bi-brightness-high" },
  { name: "Game-Show", icon: "bi bi-joystick" },
  { name: "History", icon: "bi bi-book-half" },
  { name: "Horror", icon: "bi bi-slash-circle" },
  { name: "Music", icon: "bi bi-music-note-beamed" },
  { name: "Musical", icon: "bi bi-music-note-list" },
  { name: "Mystery", icon: "bi bi-question-circle" },
  { name: "News", icon: "bi bi-newspaper" },
  { name: "Reality-TV", icon: "bi bi-tv" },
  { name: "Romance", icon: "bi bi-heart" },
  { name: "Sci-Fi", icon: "bi bi-lightbulb" },
  { name: "Short", icon: "bi bi-file-earmark-text" },
  { name: "Sport", icon: "bi bi-trophy" },
  { name: "Talk-Show", icon: "bi bi-chat" },
  { name: "Thriller", icon: "bi bi-lightning" },
  { name: "War", icon: "bi bi-bomb" },
  { name: "Western", icon: "bi bi-cow" }
];

constructor(private filterSevice:FiltersService){}

//create input to recive the open or close event
@Output() selectedOption = new EventEmitter<string>();
HandleClick(event:string){
  this.filterSevice.updateGenere(event);
  console.log("sidebar options add to sahred" + this.filterSevice.sidbarGenere);
  this.selectedOption.emit(event);
}



}
