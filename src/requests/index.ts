import request from "./request";

//Register Student
export const RegisterStudentCall = async(data: RegisterStudentPayload) => {
  return (await request.post("/Authentication/RegisterStudent", data))?.data;
}
export const LecturerSignUpCall = async (data: RegisterLecturerPayload) => {
  return (await request.post("/Authentication/RegisterLecturer", data))
    ?.data;
};