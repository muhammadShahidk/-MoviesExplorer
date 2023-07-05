import { Component, Input } from '@angular/core';
import { MoveTitleDetails } from 'src/app/Models/IModels';

@Component({
  selector: 'app-move-details',
  templateUrl: './move-details.component.html',
  styleUrls: ['./move-details.component.css']
})
export class MoveDetailsComponent {
  @Input() Movie?:MoveTitleDetails ;

}
