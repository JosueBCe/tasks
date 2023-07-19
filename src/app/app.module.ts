import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-list/contact-item/contact-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsListComponent } from './documents/documents-list/documents-list.component';
import { DocumentsItemComponent } from './documents/documents-item/documents-item.component';
import { DocumentsDetailsComponent } from './documents/documents-details/documents-details.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { DocumentService } from './documents/document.service';
import { ContactService } from './contacts/contact.service';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from './messages/message.service';

import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { DndModule } from 'ng2-dnd';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import { CompletedFilterPipe } from './contacts/completed-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { CompletedDropdownDirective } from './shared/completeddropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentsListComponent,
    DocumentsItemComponent,
    DocumentsDetailsComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    CompletedDropdownDirective,
    DocumentEditComponent,
    ContactEditComponent,
    ContactsFilterPipe,
    CompletedFilterPipe,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    HttpClientModule,
    CommonModule

  ],
  providers: [MessageService, ContactService, DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
