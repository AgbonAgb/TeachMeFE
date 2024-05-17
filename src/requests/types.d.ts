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