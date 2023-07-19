import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { MessageListComponent } from '../message-list/message-list.component';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  currentSender = "Josue"
  @ViewChild('subject', { static: false }) subject: ElementRef | undefined;
  @ViewChild('msgText', { static: false }) msgText: ElementRef | undefined;
  @ViewChild('id', { static: false }) id: ElementRef | undefined;
  @Output() addMessageEvent = new EventEmitter<Message>();
  constructor(private messageService: MessageService
    , private messageListComponent : MessageListComponent) { }

  onSendMessage(){
    const subject = this.subject?.nativeElement.value;
    const msgText = this.msgText?.nativeElement.value;
    const id = this.id?.nativeElement.value;
    const newMsg = new Message(subject, msgText ,128);
    this.messageService.addMessage(newMsg);
    this.messageService.syncMessages()
 /*    this.messageListComponent.ngOnInit() Line that makes work but upload everything again, unefficient*/
    this.onClear()

  }
  onClear(){
    this.subject!.nativeElement.value  = null;
    this.msgText!.nativeElement.value = null;
  }
}
