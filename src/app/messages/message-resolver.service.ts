/* import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Message } from './message.model';
import { DataStorageService } from '../shared/data-storage.service';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class MessagesResolverService implements Resolve<Message[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private messagesService: MessageService

  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const messages = this.messagesService.getMessages();

    if (messages) {
      return this.dataStorageService.fetchMessages();
    } else {
      return messages;
    }
    // return this.dataStorageService.fetchMessages();
  }
}
 */
 import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Message } from './message.model';
import { DataStorageService } from '../shared/data-storage.service';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class MessagesResolver implements Resolve<Message[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private messagesService: MessageService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Message[]> {
    return this.messagesService.getMessages().pipe(
      switchMap((messages: Message[]) => {
        if (messages.length === 0) {
          return this.dataStorageService.fetchMessages();
        } else {
          return of(messages);
        }
      })
    );
  }
} 
/* import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesResolverService implements Resolve<Message[]> {

  constructor(private messageService: MessageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Message[]> | Promise<Message[]> | Message[] {
    console.log('Loading messages...');
    const messages = this.messageService.getMessages();
    console.log('Messages loaded:', messages);
    return messages;
  }

} */
/* import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesResolver implements Resolve<Message[]> {

  constructor(private messageService: MessageService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.messageService.getMessages();
  }

} */