import request from "./request";
// import { LecturersResponse, LoginData, LoginPayload,  } from "./types";

//Register Student
export const RegisterStudentCall = async (data: RegisterStudentPayload) => {
  return (await request.post("/Authentication/RegisterStudent", data))?.data;
}

//Register Lecturer 
export const LecturerSignUpCall = async (data: LecturerSignUpPayload) => {
  return (await request.post("/Authentication/RegisterLecturer", data))
    ?.data;
};
//Login
export const LoginCall = async (data: LoginPayload) => {
  return (await request.post("/Authentication/Authenticate", data))
    ?.data as LoginData;
};
export const UploadContentCall = async (data: FormData) => {
  return (await request.post("/Lecturer/UploadContent", data))?.data;
};
//GetAllCategory
export const GetCategoryCall = async () => {
  const url = "/Category";

  return await request.get(url);
};
//GetAllMaterial
export const GetMaterialTypeCall = async () => {
  const url = "/Lecturer/MaterialType";

  return await request.get(url);
};
//GetAllContents
export const GetAllContents = async (UserId:string) => {
  // const url = "/Lecturer/GetAllContent";

const url =`/Lecturer/GetAllContentbyLecturer?LectId=${UserId}`
  return await request.get(url);
};
//GetLecturerProfile
export const GetLecturerProfile = async (UserId: string) => {
  const encodedUserID = encodeURIComponent(UserId);

  const url = `/Lecturer/GetLecturer?Id=${encodedUserID}`;

  return await request.get(url);
};
//UpdateLecturer
export const LecturerProfileUpdateCall = async (data: FormData) => {
  return (await request.post("/Lecturer/UpdateProfile", data))?.data;
};


//Get Lecturers
export const GetAllLecturersCall = async () => {
  return (await request.get("/Lecturer/GetAllLecturer"))?.data as LecturersResponse
};

//Get Materials
export const GetAllMaterialsCall = async () => {
  return (await request.get("/Lecturer/GetAllContent"))?.data as LecturersResponse
};
//Get Payment By Lecturer ID
export const GetPaymentByLecturerId = async (UserId:string) => {
  const encodedUserID = encodeURIComponent(UserId);
  const url = `/Lecturer/GetMyPayments?LectId=${encodedUserID}`;
  return await request.get(url);
};