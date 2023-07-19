/* import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {

  messages: Message[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    //this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
  }
  onAddMessage(message: Message){
    this.messages.push(message);
  }


}
 */
/* import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [];

  constructor(private messageService: MessageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.messages = data['messages'];
      this.messageService.setMessages(this.messages);
    });
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
} */
/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.messages = data['messages'];
      }
    );
  }
   onAddMessage(message: Message) {
    this.messages.push(message);
  }
} */
/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  private subscription!: Subscription;
  messages: Message[] = [];

  constructor(private route: ActivatedRoute,private messagesService : MessageService) { }

  ngOnInit() {
    this.subscription= this.messagesService.messagesChanged.subscribe(
      (messages: Message[]) => {

        this.messages = messages;
        console.log(this.messages)
      }
    )
  }
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
} */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy{
  private subscription!: Subscription;
  messages: Message[] = [];

  constructor(private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {

    this.subscription = this.messageService.messagesChanged.subscribe(
      (messages: Message[]) => {
        this.messages = messages;


      }
    );
    this.messageService.messageChangedEvent.subscribe(
/*     this.messageService.getMessages().subscribe( */

      (messages: Message[]) => {


        this.messages = messages;
      }
    );
    this.route.params.subscribe(() => {
      this.messageService.syncMessages();
    });

  }

  onAddMessage(message: Message) {
    this.messageService.addMessage(message);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
