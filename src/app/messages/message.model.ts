export class Message {
  public id: string;
  public subject: string;
  public msgText: string;
  public sender: any;

  constructor(subject: string, msgText: string, sender: any
    ) {
    this.id = Math.random().toString(36).substring(2, 10);
    this.subject = subject;
    this.msgText = msgText;
    this.sender = sender;
  }
}
