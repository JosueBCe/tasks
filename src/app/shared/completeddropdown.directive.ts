import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'h3[appDropdown]'
})
export class CompletedDropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  @HostListener('click', ['$event']) onToggle(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  constructor(private elRef: ElementRef) {}
}
