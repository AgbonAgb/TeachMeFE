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
interface LecturerSignUpPayload {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
  UserName: string;
}
interface LoginPayload {
  Email: string;
  Password: string;
}
interface LoginData {
  UserId:string;
  UserType:string;
  Message: string;
  StatusCode: number;
  Token: string;

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



 interface Response {
  StatusCode: number
  Message: string
  Data: any
}

 interface LecturersResponse extends Response {
  LecturerProfileId: number
  LinkName: string
  LecturerId: string
  Address: string
  ApprovedStatus: boolean
  PixUrl: string
  IdCardUrl: string
  TermsCondition: string
  FirstName: string
  LastName: string
  Email: string
  UserType: string
 }