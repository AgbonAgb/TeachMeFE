interface RegisterStudentPayload {
  UserName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  Phone: string;
}
interface ChangePasswordPayload {
  CurrentPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
}

interface Response {
  StatusCode: number;
  Message: string;
  Data: any;
}

interface LecturersResponse extends Response {
  LecturerProfileId: number;
  LinkName: string;
  LecturerId: string;
  Address: string;
  ApprovedStatus: boolean;
  PixUrl: string;
  IdCardUrl: string;
  TermsCondition: string;
  FirstName: string;
  LastName: string;
  Email: string;
  UserType: string;
}

interface SubscribePayload {
  UserId: string;
  LecturerId: string;
}

interface MaterialsResponse {
  ContentId: number;
  Title: string;
  Description: string;
  LecturerId: string;
  Amount: number;
  CategoryId: number;
  MaterialTypeId: string;
  ExpirationDays: number;
  PublishedDate: string;
  ContentFile: any;
  ContentUrl: string;
  LinkName: string;
}

interface ProcessPaymentPayload{
  Amount: number
  Description: string
  ReturnURL: string
  PaymentForm: string
  StudentId: string
  ContentId: number
}
interface QueryPaymentResponse {
  transactionStatus: string;
  transactionReference: string;
  message: string;
  charge: number;
  redirectURL?: any;
}
interface PaymentDetails {
  TransactionStatus?: any;
  TransactionReference: string;
  Charge: number;
  RedirectURL: string;
  Message?: any;
}