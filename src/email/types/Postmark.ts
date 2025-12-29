export interface PostmarkAddress {
  Email: string;
  Name: string;
  MailboxHash: string;
}

export interface PostmarkHeader {
  Name: string;
  Value: string;
}

export interface PostmarkAttachment {
  Name: string;
  Content: string;
  ContentType: string;
  ContentLength: number;
  ContentID?: string;
  ContentDisposition?: string;
}

export interface PostmarkInbound {
  FromName: string;
  MessageStream: string;
  From: string;
  FromFull: PostmarkAddress;
  To: string;
  ToFull: PostmarkAddress[];
  Cc: string;
  CcFull: PostmarkAddress[];
  Bcc: string;
  BccFull: PostmarkAddress[];
  OriginalRecipient: string;
  Subject: string;
  MessageID: string;
  ReplyTo: string;
  MailboxHash: string;
  Date: string;
  TextBody: string;
  HtmlBody: string;
  StrippedTextReply: string;
  Tag: string;
  Headers: PostmarkHeader[];
  Attachments: PostmarkAttachment[];
}
