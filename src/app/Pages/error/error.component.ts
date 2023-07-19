import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  key:string|null='0'; 
  Value(e:MouseEvent){
    let el = (e.target as HTMLSpanElement).animate({})
    console.log(el)
    let key = (e.target as HTMLElement).textContent;
    console.log("youPresed" + key)
    if(key){this.key = eval(this.key += key);}
  }
}
