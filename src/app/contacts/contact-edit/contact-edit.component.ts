import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})

export class ContactEditComponent implements OnInit {
  originalContact!: Contact ;
  contact: Contact  | undefined ;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.id) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(this.id);
        if (!this.originalContact) {
          return;
        }

        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.contact?.group) {
          this.groupContacts = JSON.parse(JSON.stringify(this.contact?.group));
        }
      }
    );
  }
  onSubmit(form: NgForm) {
    this.contactService.contactsFetched = false;
    const completedTask = false
    const value = form.value;
    const id = this.contactService.maxContactId + 1
    const newContact = new Contact(
      id.toString(),
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts,
      completedTask
    );


    if (this.editMode) {
      this.contactService.contactsFetched = false;
      newContact.group = this.groupContacts;
      this.contactService.updateContact(this.originalContact, newContact);

    } else {
      this.contactService.contactsFetched = false;
      newContact.group = this.groupContacts;
      this.contactService.addContact(newContact);

    }
    this.contactService.contactsFetched = false;
    this.router.navigate(['/contacts']);

  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      // newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      // newContact is the same as the current contact being edited
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        // newContact is already in the current contact's group array
        return true;
      }
    }
    return false;
  }


  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
    this.contactService.contactsFetched = false;
  }
  onCancel() {
    this.router.navigate(['/contacts']);
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);

    this.contactService.contactsFetched = false;
  }
}
