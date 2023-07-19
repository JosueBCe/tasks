import { Component, Input, OnInit } from '@angular/core';
import { response } from 'express';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  messageSender: string = "";

  @Input() message!: Message;

  constructor(private contactService: ContactService) { }

 /*  ngOnInit() {
    this.contactService.getSingleContact(this.message.id).subscribe(
      (contact: Contact) => {
        const contact = response.contact
        console.log(contact)
        this.messageSender = contact.name;
      },
      (error: any) => {
        console.log(error);
      }
    );
  } */
  ngOnInit() {
 /*    this.contactService.getSingleContact(this.message.sender).subscribe(
      (response: any) => {
        const contact = response.contact; */
        /* this.messageSender = contact.name; Work Later in implementation of login or something to be a chat*/
        this.messageSender = "Josue"
 /*      },
      (error: any) => {
        console.log(error);
      }
    ); */
  }

}

/* import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  messageSender$: Observable<string | undefined> = of(undefined);
  @Input() message!: Message;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    const contact: Contact | undefined = this.contactService.getContact(this.message?.sender);
    if (contact) {
      this.messageSender$ = of(contact.name);
    }
  }
} */
/* import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  @Input() message!: Message;
  messageSender: string | undefined;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    const contact: Contact | undefined = this.contactService.getContact(this.message?.sender);
    if (contact) {
      this.messageSender = contact.name;
    }
  }
} */

/* import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  messageSender$ = new BehaviorSubject<string>('');

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    const contact: Contact | undefined = this.contactService.getContact(this.message?.sender);
    if (contact) {
      this.messageSender$.next(contact.name);
    }
  }
} */
