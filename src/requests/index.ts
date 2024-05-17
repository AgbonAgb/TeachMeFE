import request from "./request";
import { ContentUploadPayload, LecturerProfilePayload, LecturerSignUpPayload, LoginData, LoginPayload, RegisterStudentPayload } from "./types";

//Register Student
export const RegisterStudentCall = async(data: RegisterStudentPayload) => {
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
export const UploadContentCall = async (data: ContentUploadPayload) => {
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
export const GetAllContents = async () => {
  const url = "/Lecturer/GetAllContent";

  return await request.get(url);
};
//GetLecturerProfile
// export const GetLecturerProfile = async () => {
//   const url = `/Lecturer/GetLecturer?Id=${user?.UserId}`;

//   return await request.get(url);
// };
//UpdateLecturer

export const LecturerProfileUpdateCall = async (data: LecturerProfilePayload) => {
  return (await request.post("/Lecturer/UpdateProfile", data))?.data;
};
