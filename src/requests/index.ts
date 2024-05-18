import request from "./request";
export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' || 'http://localhost:3001' : 'http://174.142.93.40:9082';

//Register Student
export const RegisterStudentCall = async (data: RegisterStudentPayload) => {
  return (await request.post("/Authentication/RegisterStudent", data))?.data;
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
}

//Query Payment
export const QueryPaymentCall = async (reference : string) => {
  return (await request.get(`/Payment/${reference}/QueryProcessedPayment`))?.data as QueryPaymentResponse;
}