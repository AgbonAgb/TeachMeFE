interface Response {
  StatusCode: number;
  Message: string;
  Data: any;
}

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
  memberId:string;
}
interface LecturerSignUpPayload {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Password: string;
  UserName: string;
}
interface LoginPayload {
  Email: string;
  Password: string;
}
interface LoginData {
  UserId: string;
  UserType: string;
  Message: string;
  StatusCode: number;
  Token: string;
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

interface ProcessPaymentPayload {
  Amount: number;
  Description: string;
  ReturnURL: string;
  PaymentForm: string;
  StudentId: string;
  ContentId: number;
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

interface ContentUploadPayload {
  ContentId?: string;
  Title: string;
  Description: string;
  LecturerId?: string;
  Amount: string;
  CategoryId: string;
  MaterialTypeId: string;
  ExpirationDays: string;
  PublishedDate?: string;
  ContentFile: any;
  LinkName: string;
  ContentUrl?: string;
}

interface CategoryPayload {
  ContentCategoryName: string;
  LecturerId: string;
  CategoryId?:number

}
interface LecturerProfilePayload {
  LecturerProfileId?: string;
  LecturerId?: string;
  LinkName: string;
  NickName?: string;
  Address: string;
  PixFile: File | null;
  IdCardFile: File | null;
  TermsCondition: boolean;
  IdCardUrl?: File | null;
  PixUrl?: File | null;
}

interface MaterialTypePayload{
  Id: number
  Name: string
}

interface GetMaterialType{
  Key: number
  Value: string
}
