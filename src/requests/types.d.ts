interface RegisterStudentPayload{
    UserName: string
    FirstName: string
    LastName: string
    Email: string
    Password: string
    Phone: string 
}
interface ChangePasswordPayload{
  CurrentPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
}

export interface Response {
  StatusCode: number
  Message: string
  Data: any
}

export interface LecturersResponse extends Response {
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
