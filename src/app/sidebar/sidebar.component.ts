import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
sibarOptions = [
,"Action"
,"Adventure"
,"Animation"
,"Biography"
,"Comedy"
,"Crime"
,"Documentary"
,"Drama"
,"Family"
,"Fantasy"
,"Film-Noir"
,"Game-Show"
,"History"
,"Horror"
,"Music"
,"Musical"
,"Mystery"
,"News"
,"Reality-TV"
,"Romance"
,"Sci-Fi"
,"Short"
,"Sport"
,"Talk-Show"
,"Thriller"
,"War"
,"Western"

]

@Output() selectedOption = new EventEmitter<string>();
HandleClick(event:MouseEvent){
  const target = event.target as HTMLElement;
  this.selectedOption.emit(target.textContent ?? '');
}



}
