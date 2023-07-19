/* import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contacts: Contact[] = [];
  maxContactId!: number;
  private contactsUrl = 'https://mean-stack-48dee-default-rtdb.firebaseio.com/contacts.json';

  constructor(private http: HttpClient) {
    this.getContacts().subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.sortContacts();
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl);
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  private sortContacts() {
    this.contacts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null!;
  }

  storeContacts() {
    const contacts = this.contacts.slice();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.contactsUrl, contacts, { headers: headers })
      .subscribe(
        () => {
          this.contactListChangedEvent.next(contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }


}
 */
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject, tap } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  maxContactId!: number;
  completedTasksChangedEvent = new EventEmitter<number>();
  totalCompletedTasks!: number;
  contacts: Contact[] = [];
  contactsFetched = false;
  contactsUrl = "http://localhost:3000/api/contacts";
  tasksUrl = "http://localhost:3000/api/completedtasks";

  constructor(private http: HttpClient) {
    this.getContacts().subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contactChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setContacts(contacts: Contact[]) {
    this.contacts = contacts;
    this.contactListChangedEvent.next(this.contacts.slice());
  }


  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  getContacts(): Observable<Contact[]> {
    return this.http.get<{contacts: Contact[]}>(this.contactsUrl, { responseType: 'json' })
      .pipe(
        map(responseData => responseData.contacts),
        tap(contacts => {
          this.contacts = contacts;
          this.contactListChangedEvent.next(this.contacts.slice());
        })
      );
  }

  getContactResolver(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl).pipe(
      map((contacts: Contact[]) => {
        return contacts.map((contact: Contact) => {
          return {
            ...contact,
          };
        });
      }),
      tap((contacts: Contact[]) => {
        this.contacts = contacts;
        this.contactListChangedEvent.next(this.contacts.slice());
      })
    );
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null!;
  }


  getSingleContact(id: string) {
    return this.http.get<Contact>('http://localhost:3000/api/contacts/' + +id);
  }
  storeContacts() {
    const contacts = this.contacts.slice();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.contactsUrl, contacts, { headers: headers })
      .subscribe(
        () => {
          this.contactListChangedEvent.next(contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

 /*  addContact(contact: Contact) {
    this.contactsFetched = false;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, data: Contact }>(this.contactsUrl, contact, { headers: headers })
      .subscribe(
        (responseData) => {
          this.contactsFetched = false;

          this.contacts.push(responseData.data);

          this.contactChangedEvent.next(this.contacts.slice());
          this.contactListChangedEvent.next(this.contacts.slice());

        },
        (error: any) => {
          console.log(error);
        }
      );
  }
 */
  addContact(newContact: Contact) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<{ contact: Contact }>(this.contactsUrl,
      newContact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  updateContact(originalContact: Contact, newContact: Contact) {
    const pos = this.contacts.findIndex(c => c.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contactsFetched = false;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.contactsUrl + '/' + originalContact.id, newContact, { headers: headers })
      .subscribe(
        () => {

          this.contacts[pos] = newContact;
          this.contactListChangedEvent.next(this.contacts.slice());

        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  deleteContact(contact: Contact) {
    const pos = this.contacts.findIndex(c => c.id === contact.id);

    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(this.contactsUrl + '/' + contact.id, { headers: headers })
      .subscribe(
        () => {
          this.contactsFetched = false;
          this.contacts.splice(pos, 1);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }





}
