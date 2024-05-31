import Category from "../components/lecturer/category/category";
import request from "./request";
export const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" || "http://localhost:3001" : "http://10.12.200.15:1447";

// "build": "react-scripts build",

//Register Student
export const RegisterStudentCall = async (data: RegisterStudentPayload) => {
  return (await request.post("/Authentication/RegisterStudent", data))?.data;
};

//Register Lecturer
export const LecturerSignUpCall = async (data: LecturerSignUpPayload) => {
  return (await request.post("/Authentication/RegisterLecturer", data))?.data;
};
//Login
export const LoginCall = async (data: LoginPayload) => {
  return (await request.post("/Authentication/Authenticate", data))?.data as LoginData;
};
//upload content
export const UploadContentCall = async (data: FormData) => {
  return (await request.post("/Lecturer/UploadContent", data))?.data;
};
//Edit content
export const EditUploadContentCall = async (data: FormData) => {
  return (await request.post("/Lecturer/EditContent", data))?.data;
};
//GetAllCategory
export const GetCategoryCall = async () => {
  const url = "/Category";

  return await request.get(url);
};
//GetAllMaterialType 
export const GetMaterialTypeCall = async () => {
  const url = "/Lecturer/MaterialType";

  return await request.get(url);
};
//GetAllContents
export const GetAllContents = async (UserId:string) => {
const url =`/Lecturer/GetAllContentbyLecturer?LectId=${UserId}`
  return await request.get(url);
};

//GetAllStudentSubscriberByLecturer
export const GetAllStudentSubscriberByLecturer = async (UserId:string) => {
  const url =`/Lecturer/MySubscribedStudents?LecturerID=${UserId}`
    return await request.get(url);
  };
//GetLecturerProfile
export const GetLecturerProfile = async (UserId: string) => {
  const url = `/Lecturer/GetLecturer?Id=${UserId}`;
  return await request.get(url);
};
//UpdateLecturer
export const LecturerProfileUpdateCall = async (data: FormData) => {
  return (await request.post("/Lecturer/UpdateProfile", data))?.data;
};

//Get Lecturers
export const GetAllLecturersCall = async () => {
  return (await request.get("/Lecturer/GetAllLecturer"))?.data as LecturersResponse;
};

//Subscribe to Lecturers
export const SubscribeToLecturersCall = async (data: SubscribePayload) => {
  return (await request.post("/Student/subscribeToLectures", data))?.data;
};

//Get Materials
export const GetAllMaterialsCall = async () => {
  return (await request.get("/Lecturer/GetAllContent"))?.data as MaterialsResponse;
};

//Process Payment
export const ProcessPaymentCall = async (data: ProcessPaymentPayload) => {
  return (await request.post("/Payment/ProcessPayment", data))?.data;
};

//Query Payment
export const QueryPaymentCall = async (reference: string) => {
  return (await request.get(`/Payment/${reference}/QueryProcessedPayment`))?.data;
};

//Get Payment By Lecturer ID
export const GetPaymentByLecturerId = async (UserId: string) => {
  const url = `/Lecturer/GetMyPayments?LectId=${UserId}`;
  return await request.get(url);
};

export const GetMaterialTypesCall = async () => {
  return( await request.get('/Lecturer/MaterialType'))?.data;
};

export const GetContentByIdCall = async (id: number) => {
  const response = (await request.get(`/Lecturer/GetContent?contentId=${id}`, {responseType:"blob"} ))?.data 
  return response;
}

export const GetMyPaidMaterialsCall = async (id: string)=>{
  return (await request.get(`/Student/Mypaidmaterial?studentId=${id}`))?.data
}


//ChangePassword
export const ChangePasswordCall = async (payload: ChangePasswordPayload) => {
	const formData = new FormData();
    formData.append("CurrentPassword", payload?.CurrentPassword);
    formData.append("NewPassword", payload?.NewPassword);
    formData.append("ConfirmPassword", payload?.ConfirmPassword);
	return (await request.post(`/Authentication/ChangePasswordAsync?memberId=${payload?.memberId}`, formData))?.data as Response;
};

export const GetMySubscribedLecturersCall = async (studentId: string) => {
  return (await request.get(`/Student/MypSubscribedLecturer?studentId=${studentId}`))?.data as MySubscribedLecturersResponse;
}

export const GetCategoryByLecturerIdCall = async (lecturerId: string) => {
  return (await request.get(`/Lecturer/LecturerContentCategory?LecturerID=${lecturerId}`))?.data as CategoryResponse;
}

export const GetOnlySubscribedLecturersMaterialsCall= async (lecturerId: string, categoryId: number) => {
  return (await request.get(`/Lecturer/GetCategoryContent?LecturerID=${lecturerId}&Categoryid=${categoryId}`))?.data as MySubscribedLecturersMaterialsResponse;
}
//get Category By Lecturer Id
export const GetCategoryByLecturerId = async (UserId: string) => {
  const url = `/Category/lecturer/${UserId}`;
  return await request.get(url);
};
//Create Category
export const CreateCategoryCall = async (payload: CategoryPayload) => {
  const url ='/Category';
  return await request.post(url,payload);
};

//get content by category id and lecture id
export const GetContentByCategoryId = async (UserId: string, categoryId:string) => {
  const url = `/Lecturer/GetCategoryContent?LecturerID=${UserId}&Categoryid=${categoryId}
  `;
  return await request.get(url);
};
