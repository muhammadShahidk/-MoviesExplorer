import { Component, Input } from '@angular/core';
import { MoveTitleDetails } from 'src/app/Models/IModels';

@Component({
  selector: 'app-popup-model',
  templateUrl: './popup-model.component.html',
  styleUrls: ['./popup-model.component.css']
})
export class PopupModelComponent {
  //get input
  @Input() Id = '';
  @Input() Title = '';
  @Input() saveBtnColor = 'primary';
  // const myModal = new bootstrap.Modal(document.getElementById('myModal'), options)
  // // or
  // const myModalAlternative = new bootstrap.Modal('#myModal', options)
}
