import { toast } from "react-toastify";

const ErrorHandler = (error: any) => {
  console.log(error);
  if (error.message === "Network error") {
    console.log("i am here");
    return toast.error("Please check your internet connection");
  }
  if (error.response.status !== 401) {
    return toast.error(error.response.data.message);
  }
  if (
    error.response.status === 401 &&
    error.response.data.message === "Kindly confirm your email address"
  ) {
    toast.error(error.response.data.message);
  } else {
    toast.error("Your token has expired, redirecting you to login page");
    return setTimeout(() => {
      window.location.replace("/login");
    }, 2000);
  }
};

export default ErrorHandler;
