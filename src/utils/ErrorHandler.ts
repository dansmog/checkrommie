import { toast } from "react-toastify";

const ErrorHandler = (error: any) => {
  if (error.message === "Network error") {
    console.log("i am here");
    return toast.error("Please check your internet connection");
  }
  if (error.response.status === 401) {
    toast.error("Your token has expired, redirecting you to login page");
    return setTimeout(() => {
      window.location.replace("/login");
    }, 2000);
  } else if (error.response.status !== 401) {
    return toast.error(error.response.data.message);
  }
};

export default ErrorHandler;
