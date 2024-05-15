export const logout = () => {
    localStorage.removeItem("loan-user");
    localStorage.removeItem("student-profile");
    window.location.href = "/";
  }