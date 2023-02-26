export class GeneralSuggestAdd {
  id: number;
  title: string;
  body: string;
}

export class GeneralSuggest extends GeneralSuggestAdd {
  body: string;
  createAt: string;
  createdApplicationUserId: string;
  createdEmail: string;
  createdFullName: string;
  createdIsConnectionAvailable: boolean;
  createdPhoneNumber: string;
  createdUserName: string;
  createdUserTypeName: string;
  deliveryOrderId: number;
  finishEmail: string;
  finishFullName: string;
  finishPhoneNumber: string;
  finishUserName: string;
  finishedDateTime: string;
  finisherApplicationUserId: number;
  id: number;
  isFinished: boolean;
  isRead: boolean;
  note: string;
  readDateTime: string;
  readEmail: string;
  readFullName: string;
  readPhoneNumber: string;
  readUserName: string;
  readerApplicationUserId: string;
  status: string;
  title: string;
  transportOrderId: number;
  updateAt: string;
  replies: IReplies[];
}

interface IReplies {
  createAt: string;
  id: 5;
  isFromAdmin: true;
  message: string;
  replyUserId: string;
  replyUserName: string;
}

export class GeneralSuggestFilter {
  constructor() {
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
    this.Title = null;
  }
  PageNumber: number;
  PageSize: number;
  CreateAtFrom: Date;
  CreateAtTo: Date;
  UserTypeName: string;
  Title: string;
  Status: string;
}
