import request from "./request";

//Register Student
export const RegisterStudentCall = async(data: RegisterStudentPayload) => {
  return (await request.post("/Authentication/RegisterStudent", data))?.data;
}