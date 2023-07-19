import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-documents-item',
  templateUrl: './documents-item.component.html',
  styleUrls: ['./documents-item.component.css']
})
export class DocumentsItemComponent implements OnInit {
@Input () document : Document | undefined 
@Output() documentSelected = new EventEmitter<void>();
@Input() index: string | undefined;

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.documentSelected.emit();
  }

}
