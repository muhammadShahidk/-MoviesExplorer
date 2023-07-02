import { Component, Input } from '@angular/core';
import { MoveTitleDetails } from '../Models/IModels';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css']
})
export class MoveComponent {
@Input  () movie!:MoveTitleDetails;
}
