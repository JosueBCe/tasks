import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {

  }


  originalDocument!: Document;
  document: Document | undefined;
  editMode: boolean = false;
  id!: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (isNaN(+this.id) || +this.id < 1) {
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentService.getDocument(this.id);
        if (!this.originalDocument) {
          return;
        }

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newDocument = new Document(
      value.id,
      value.name,
      value.description,
      value.url,
      value.children
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

}


  /*   [x: string]: any;
  @ViewChild('f', { static: false })
  slForm!: NgForm; */

  // ngOnInit(){
  //   this.route.params.subscribe((params: Params) => {
  //       this['id'] = params['id'];


  //       if(!this['id']) {
  //         this.editMode = false;
  //         return;
  //       }


  //      this['originalDocument'] = this.documentService.getDocument(this['id'])


  //       if(!this['originalDocument']) {
  //         return
  //       }
  //       this.editMode = true;
  //       this['contact'] = JSON.parse(JSON.stringify(this['originalDocument']));


  //       if(
  //         this['originalDocument'].group &&
  //         this['originalDocument'].group.length > 0
  //       ){
  //         this['groupContacts'] = JSON.parse(
  //           JSON.stringify(this['originalDocument'].group)
  //         );
  //       }

  //     });
  // }

