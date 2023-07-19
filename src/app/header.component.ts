import { Component , EventEmitter, HostBinding, Output  } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
