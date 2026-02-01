export class EmailReceivedEvent {
  emailId: string;

  constructor(id: string) {
    this.emailId = id;
  }
}
