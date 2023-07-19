import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { MessageService } from '../messages/message.service';
import { Message } from '../messages/message.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private messageService: MessageService) {}

  storeMessages() {
    const messages = this.messageService.getMessages();
    this.http
      .put(
        'https://mean-stack-48dee-default-rtdb.firebaseio.com/messages.json',
        messages
      )
      .subscribe(response => {
        console.log(response);
      });
  }


  fetchMessages(): Observable<Message[]> {
    return this.messageService.getMessages().pipe(
      map((messages: Message[]) => {
        return messages.map((message: Message) => {
          return {
            ...message,
          };
        });
      }),
      tap((messages: Message[]) => {
        this.messageService.setMessages(messages);
      })
    );
}
}
/*   fetchMessages() {
    return this.http
      .get<Message[]>(
        'https://mean-stack-48dee-default-rtdb.firebaseio.com/messages.json'
      )
      .pipe(
        map(messages => {
          return messages.map(message => {
            return {
              ...message,
            };
          });
        }),
        tap(messages => {
          this.messageService.setMessages(messages);
        })
      )
  } */