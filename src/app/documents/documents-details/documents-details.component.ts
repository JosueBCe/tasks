import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';


@Component({
  selector: 'cms-documents-details',
  templateUrl: './documents-details.component.html',
  styleUrls: ['./documents-details.component.css']
})
export class DocumentsDetailsComponent implements OnInit {
  nativeWindow: any;
  document!: Document | undefined ;
  id!: string;  
  subscription: any;
  constructor(private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windowRef: WindRefService
    ) {
}


  ngOnInit(){
    
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    )
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        // Find the document with the same ID as this component
        const doc = documents.find(d => d.id === this.id);
        if (doc) {
          this.document = doc;
        }
      }
    );
    this.nativeWindow = this.windowRef.getNativeWindow();
  }
  onView(){
    if(this.document?.url){
      this.nativeWindow.open(this.document.url);
    }
  }
  onDelete(){
    this.documentService.deleteDocument(this.document!);
    this.router.navigate(['/documents']);
  }

}
