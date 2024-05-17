import request from "./request";
import { LecturersResponse, RegisterStudentPayload } from "./types";

//Register Student
export const RegisterStudentCall = async (data: RegisterStudentPayload) => {
  return (await request.post("/Authentication/RegisterStudent", data))?.data;
};

//Get Lecturers
export const GetAllLecturersCall = async () => {
  return (await request.get("/Lecturer/GetAllLecturer"))?.data as LecturersResponse
};

//Get Materials
export const GetAllMaterialsCall = async () => {
  return (await request.get("/Lecturer/GetAllContent"))?.data as LecturersResponse
};

