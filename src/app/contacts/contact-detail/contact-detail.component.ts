import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {


  @Input() contact: Contact | undefined;
  id!: string;
  private subscription!: Subscription;

  groupContacts: Contact[] = [];
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.subscription = this.contactService.contactListChangedEvent.subscribe((contacts: Contact[]) => {
      this.contact = this.contactService.getContact(this.id);

      const updatedContact = contacts.find(c => c.id === this.contact?.id);
      if (updatedContact && updatedContact.group) {
        this.groupContacts = updatedContact.group.slice();
      }
    })
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);

      }
    );
  }
  onDelete(){
    this.contactService.deleteContact(this.contact!);
    this.router.navigateByUrl('/contacts');
  }
  onComplete() {
    const newContact = {...this.contact!, completed:true };
    this.contactService.updateContact(this.contact!, newContact);
    this.router.navigateByUrl('/contacts');
  }
  onRestore() {
      const newContact = {...this.contact!, completed:false };
      this.contactService.updateContact(this.contact!, newContact);
      this.router.navigateByUrl('/contacts');
    }

}
