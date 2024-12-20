import { useEffect, useState } from "react";
import { PiGraduationCap } from "react-icons/pi";
import InputField from "../../../components/CommonComponents/InputField";
import Button from "../../../components/CommonComponents/Button";
import BoyPcImage from "../../../assets/images/authPage/BoyPcImage.png";
import { FiArrowRight } from "react-icons/fi";
import { axiosInstance } from "../../../api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../utils/Spinner/Spinner";
import { toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import OtpVerificationModal from "../../../utils/Modals/OtpVerificationModal";
import GoogleAuthButton from "../../../utils/GoogleAuth/GoogleAuthButton";
import { useDispatch } from "react-redux";
import { studentLogin } from "../../../store/slices/studentSlice";
import storeAccessToken from "../../../api/storeAccessToken";
import socket from "@/Services/Socket";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    let error = "";
    if (name === "email" && value.length < 3) {
      error = "Enter username or email";
    } else if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters";
    }

    setErrors({ ...errors, [name]: error });
    setIsFormValid(
      Object.values({ ...errors, [name]: error }).every((err) => !err)
    );
  };
  useEffect(() => {
    const savedEmail = localStorage.getItem("formEmail");
    const savedOtpModalState = localStorage.getItem("isOtpModalOpen");

    if (savedEmail) {
      setFormData({ email: localStorage.getItem("formEmail") });
    }
    if (savedOtpModalState === "true") {
      setOtpModalOpen(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isFormValid) return;

    try {
      const response = await axiosInstance.post("/auth/signin", formData);
      if (response?.data?.success === true) {
        const accessToken = response?.data?.accessToken;
        if (!accessToken) {
          throw new Error("Access token not provided in response.");
        }
        toast.success(response?.data?.message);
        storeAccessToken("student", accessToken, 13);
        const data = response?.data;
        dispatch(studentLogin(data));
        localStorage.removeItem("isOtpModalOpen");
        localStorage.removeItem("formEmail");
        socket.disconnect();
        socket.auth.role = "student";
        socket.auth.token = accessToken;
        socket.connect();
        setTimeout(() => {
          navigate("/student/home");
        }, 1500);
      }
    } catch (error) {
      console.error("SignIn Submit Error:", error);
      const errorMessage =
        error?.response?.data?.message || "An error occurred during sign-in.";
      toast.error(errorMessage);

      if (error?.response?.data?.not_verified) {
        resendOtp();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axiosInstance.post("auth/resend-otp", {
        email: formData.email,
        role: "student",
      });
      if (response.status === 200) {
        setOtpModalOpen(true);
        localStorage.setItem("isOtpModalOpen", true);
        localStorage.setItem("formEmail", formData.email);
        setTimeout(() => {
          toast.success(response?.data?.message);
        }, 2000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Failed to resend OTP:", error);
    }
  };

  const handleOtpVerify = async (otpString) => {
    try {
      setIsLoadingOtp(true);

      const response = await axiosInstance.post("/auth/verify-otp", {
        email: formData.email,
        otp: otpString,
        role: "student",
      });

      if (response.status === 200) {
        toast.success(response?.data?.message);
        localStorage.removeItem("isOtpModalOpen");
        localStorage.removeItem("formEmail");

        dispatch(studentLogin(response?.data));
        setOtpModalOpen(false);
        setTimeout(() => {
          navigate("/student/home");
        }, 2000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Otp verify error :", error);
    } finally {
      setIsLoadingOtp(false);
    }
  };

  const handleOtpModalClose = () => {
    setOtpModalOpen(false);
    localStorage.removeItem("isOtpModalOpen");
    localStorage.removeItem("formEmail");
  };

  const onGoogleSignInSuccess = async (data) => {
    dispatch(studentLogin({ studentData: data.userData, token: data.token }));
    const accessToken = data?.accessToken;
    if (!accessToken) {
      throw new Error("Access token not provided in response.");
    }
    toast.success(data?.message);
    storeAccessToken("student", accessToken, 13);
    socket.disconnect();
    socket.auth.role = "student";
    socket.auth.token = accessToken;
    socket.connect();
    setTimeout(() => {
      navigate("/student/home");
    }, 1500);
  };

  const toSignUp = () => {
    navigate("/student/signup");
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <PiGraduationCap className="h-6 w-6 text-[#ff5722]" />
          <span className="ml-2 text-xl font-semibold">
            <span className="text-gray-900">Edu</span>
            <span className="text-[#ff5722]">Eden</span>
          </span>
        </div>
        <div className="text-sm">
          <span className="hidden sm:inline">Don&apos;t have an account?</span>
          <button
            onClick={toSignUp}
            className="bg-[#ffeee8] text-[#ff5722] px-4 py-2 ml-2 sm:ml-4 rounded text-xs sm:text-sm"
          >
            Create Account
          </button>
        </div>
      </div>

      <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 bg-[#ebebff] items-center justify-center">
          <img src={BoyPcImage} alt="Illustration" className="max-w-[28rem]" />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 py-8 lg:py-0">
          <div className="max-w-[28rem] w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Sign in to your account
            </h1>

            <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
              <div>
                <div className="mb-7">
                  <GoogleAuthButton
                    onSuccessRedirect={(data) => onGoogleSignInSuccess(data)}
                    role={"student"}
                  />
                </div>
                <div className="flex items-center justify-center text-base font-semibold text-gray-600">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-2">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
              </div>
              <div className="relative">
                <InputField
                  label="Email"
                  placeholder="Username or email address..."
                  name="email"
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="text-xs text-red-600 absolute -bottom-4 left-0">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="relative">
                <InputField
                  onChange={handleChange}
                  label="Password"
                  placeholder="Password"
                  name="password"
                  showPassword={showPassword}
                  setShowPassword={() => setShowPassword(!showPassword)}
                />
                {errors.password && (
                  <span className="text-xs text-red-600 absolute -bottom-4 left-0">
                    {errors.password}
                  </span>
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-between mt-4">
                  <label className="flex items-center text-gray-600 mb-2 sm:mb-0">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-[#ff5722] border-gray-300 focus:ring-[#ff5722]"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-xs">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password?role=student"
                    className="hover:underline-offset-auto hover:underline text-[#ff5722] text-xs"
                  >
                    <span>Forgot Password?</span>
                  </Link>
                </div>

                <Button
                  type="submit"
                  text={isLoading ? "" : "Sign In"}
                  className="flex items-center justify-center gap-2 shadow-md mt-4 w-full"
                  disabled={
                    !isFormValid ||
                    isLoading ||
                    !formData.password ||
                    !formData.email
                  }
                >
                  {isLoading ? (
                    <Spinner size="small" />
                  ) : (
                    <FiArrowRight className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <OtpVerificationModal
        isOpen={otpModalOpen}
        onClose={handleOtpModalClose}
        onVerify={handleOtpVerify}
        isLoading={isLoadingOtp}
        onResendOtp={resendOtp}
      />
    </>
  );
};

export default SignIn;

