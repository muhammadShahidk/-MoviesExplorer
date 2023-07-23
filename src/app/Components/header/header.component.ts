import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();
  @Input() toggle: boolean = false;
  //alert that the sidenav is open or closed 
  onToggleSidenav() {
    this.toggle = !this.toggle;
    if (this.toggle) {
      //emit the event
      this.sidenavToggle.emit(true);
      console.log("Sidenav is opened");

    } else {
      this.sidenavToggle.emit(false);
      console.log("Sidenav is closed");
    }
  }
  
}
