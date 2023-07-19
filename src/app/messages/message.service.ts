/* import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject, tap } from 'rxjs';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messagesChanged = new Subject<Message[]>();

  messages: Message[] = [];

  messagesUrl = "http://localhost:3000/api/messages";

  constructor(private http: HttpClient) {
    this.getMessages().subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.messageChangedEvent.next(this.messages.slice());

      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setMessages(messages: Message[]) {
    this.messages = messages;
    this.messageChangedEvent.next(this.messages.slice());
  }


  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl, { responseType: 'json' });
  }

  getMessageResolver(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl).pipe(
      map((messages: Message[]) => {
        return messages.map((message: Message) => {
          return {
            ...message,
          };
        });
      }),
      tap((messages: Message[]) => {
        this.messages = messages;
        this.messageChangedEvent.next(this.messages.slice());
      })
    );
  }
  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null!;
  }

  storeMessages() {
    const messages = this.messages.slice();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.messagesUrl, messages, { headers: headers })
      .subscribe(
        () => {
          this.messageChangedEvent.next(messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }


  addMessage(message: Message) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<{ message: string, data: Message }>(this.messagesUrl, message, { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.data);
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    const pos = this.messages.findIndex(m => m.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.messagesUrl + originalMessage.id, newMessage, { headers: headers })
      .subscribe(
        () => {
          this.messages[pos] = newMessage;
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  deleteMessage(message: Message) {
    const pos = this.messages.findIndex(m => m.id === message.id);

    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(this.messagesUrl + message.id, { headers: headers })
      .subscribe(
        () => {
          this.messages.splice(pos, 1);
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

} */
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject, tap } from 'rxjs';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messagesChanged = new Subject<Message[]>();

  messages: Message[] = [];

  messagesUrl = "http://localhost:3000/api/messages";

  constructor(private http: HttpClient) {
    this.getMessages().subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.messagesChanged.next(this.messages.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }



  setMessages(messages: Message[]) {
    this.messages = messages;
    this.messageChangedEvent.next(this.messages.slice());
  }
  syncMessages() {
    this.messageChangedEvent.next(this.messages.slice());
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl, { responseType: 'json' });
  }

  getMessageResolver(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl).pipe(
      map((messages: Message[]) => {
        return messages.map((message: Message) => {
          return {
            ...message,
          };
        });
      }),
      tap((messages: Message[]) => {
        this.messages = messages;
        this.messageChangedEvent.next(this.messages.slice());
      })
    );
  }

  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null!;
  }

  storeMessages() {
    const messages = this.messages.slice();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.messagesUrl, messages, { headers: headers })
      .subscribe(
        () => {
          this.messageChangedEvent.next(messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  addMessage(message: Message) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<{ message: string, data: Message }>(this.messagesUrl, message, { headers: headers })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.data);
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    const pos = this.messages.findIndex(m => m.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.messagesUrl + originalMessage.id, newMessage, { headers: headers })
      .subscribe(
        () => {
          this.messages[pos] = newMessage;
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  deleteMessage(message: Message) {
    const pos = this.messages.findIndex(m => m.id === message.id);

    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.delete(this.messagesUrl + message.id, { headers: headers })
      .subscribe(
        () => {
          this.messages.splice(pos, 1);
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
