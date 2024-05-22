export const logout = () => {
  // localStorage.removeItem("loan-user");
  // localStorage.removeItem("student-profile");
  localStorage.removeItem("teach-me-app");

  window.location.href = "/";
};
