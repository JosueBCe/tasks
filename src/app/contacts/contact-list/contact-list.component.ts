import { Component, EventEmitter, OnInit, Input, Output, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  completedTasksVisible = true;
  term: string = '';
  contacts: Contact[] = [];
  completedTasks: number = 0;

  private subscription!: Subscription;
  constructor(private contactService: ContactService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.completedTasks = this.contacts.filter(contact => contact.completed).length;
      }
    )


/*     this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;

      }
    ) */
    this.route.params.subscribe(() => {

      if (!this.contactService.contactsFetched) {
      this.contactService.getContacts().subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.completedTasks = this.contacts.filter(contact => contact.completed).length;
        },
        (error: any) => {
          console.log(error);
        }
      );
    }  else {
      this.contactService.contactListChangedEvent.subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.completedTasks = this.contacts.filter(contact => contact.completed).length;

        }
      )
    }
    });
  }


    toggleCompletedTasks() {
        this.completedTasksVisible = !this.completedTasksVisible;
    }
search(value: string) {

  this.term = value;

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}


