import React, { useEffect, useState } from "react";
import TutorImage from "../../../assets/images/authPage/RocketGirlImage.png";
import { PiGraduationCap } from "react-icons/pi";
import { FiUser, FiMail, FiPhone, FiBook, FiBriefcase, FiLock, FiArrowRight } from "react-icons/fi";
import InputField from "../../../components/CommonComponents/InputField";
import Button from "../../../components/CommonComponents/Button";
import { axiosInstance } from "../../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../utils/Spinner/Spinner";
import { toast } from "sonner";
import OtpVerificationModal from "../../../utils/Modals/OtpVerificationModal";

const TutorSignup = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    user_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    field_name: "",
    experience: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({
    full_name: "",
    user_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    field_name: "",
    experience: "",
    agreeTerms: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    let error = "";
    if (name === "email") {
      if (
        !value.includes("@") ||
        !value.includes(".") ||
        /[^a-zA-Z0-9@.]/.test(value)
      ) {
        error = "Invalid email address";
      }
    } else if (name === "password") {
      if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    } else if (name === "confirmPassword") {
      if (value !== formData.password) {
        error = "Passwords do not match";
      }
    } else if (name === "full_name") {
      if (value.length < 3) {
        error = "At least 3 characters";
      }
    } else if (name === "user_name") {
      if (value.length < 3) {
        error = "At least 3 characters";
      }
    } else if (name === "phone") {
      if (!/^\d+$/.test(value) || value.length !== 10) {
        error = "Must be 10 digits";
      }
    } else if (name === "field_name") {
      if (value.length < 2) {
        error = "Field is required";
      }
    } else if (name === "experience") {
      if (isNaN(value) || value < 0) {
        error = "Enter valid years of experience";
      }
    } else if (name === "agreeTerms" && !checked) {
      error = "You must agree to the terms";
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
      setFormData((prevData) => ({ ...prevData, email: savedEmail }));
    }
    if (savedOtpModalState === "true") {
      setOtpModalOpen(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isFormValid) return;

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "") {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axiosInstance.post(
        "/auth/tutor/signup",
        formDataToSend
      );
      if (response.status === 201) {
        setOtpModalOpen(true);
        localStorage.setItem("formEmail", formData.email);
        localStorage.setItem("isOtpModalOpen", true);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log("Tutor Sign Up Submit Error: ", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpModalClose = () => {
    setOtpModalOpen(false);
    localStorage.removeItem("isOtpModalOpen");
    localStorage.removeItem("formEmail");
    localStorage.removeItem("otpTimestamp");
  };

  const handleOtpVerify = async (otpString) => {
    try {
      setIsLoadingOtp(true);

      const response = await axiosInstance.post("/auth/verify-otp", {
        email: formData.email,
        otp: otpString,
      });

      if (response.status === 200) {
        toast.success(response?.data?.message);
        setOtpModalOpen(false);
        localStorage.removeItem("isOtpModalOpen");
        localStorage.removeItem("formEmail");
        localStorage.removeItem("otpTimestamp");
        setTimeout(() => {
          navigate("/tutor/signin");
        }, 2000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Otp verify error :", error);
    } finally {
      setIsLoadingOtp(false);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axiosInstance.post("auth/resend-otp", {
        email: formData.email,
      });
      if (response.status === 200) {
        setTimeout(() => {
          toast.success(response?.data?.message);
        }, 2000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Failed to resend OTP:", error);
    }
  };

  const toTutorSignIn = () => {
    navigate("/tutor/signin");
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center mb-4 sm:mb-0">
          <PiGraduationCap className="h-6 w-6 text-[#ff5722]" />
          <span className="ml-2 text-xl font-semibold">
            <span className="text-gray-900">Edu</span>
            <span className="text-[#ff5722]">Eden</span>
          </span>
        </div>
        <div className="text-sm flex items-center">
          <span className="mr-2">Already have a tutor account?</span>
          <button
            onClick={toTutorSignIn}
            className="bg-[#ffeee8] text-[#ff5722] px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      </div>

      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 bg-[#ebebff] items-center justify-center">
          <img
            src={TutorImage}
            alt="Tutor Illustration"
            className="max-w-[28rem]"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-[28rem] mx-auto">
            <h1 className="text-2xl text-center font-bold text-gray-900 mb-6">
              Apply to become a tutor
            </h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <InputField
                    label="Full Name"
                    placeholder="Enter Full name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    error={errors.full_name}
                    icon={<FiUser className="text-gray-400" />}
                  />
                  {errors.full_name && (
                    <span className="text-xs text-red-600 absolute -bottom-5 left-0">
                      {errors.full_name}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <InputField
                    label="Username"
                    placeholder="Enter Username"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    error={errors.user_name}
                    icon={<FiUser className="text-gray-400" />}
                  />
                  {errors.user_name && (
                    <span className="text-xs text-red-600 absolute -bottom-5 left-0">
                      {errors.user_name}
                    </span>
                  )}
                </div>
              </div>

              <div className="relative">
                <InputField
                  label="Email"
                  type="text"
                  placeholder="Enter Email address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon={<FiMail className="text-gray-400" />}
                />
                {errors.email && (
                  <span className="text-xs text-red-600 absolute -bottom-5 left-0">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="relative">
                <InputField
                  label="Phone"
                  type="tel"
                  placeholder="Enter Phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  icon={<FiPhone className="text-gray-400" />}
                />
                {errors.phone && (
                  <span className="text-xs text-red-600 absolute -bottom-5 left-0">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <InputField
                    label="Field"
                    placeholder="Eg: Web Development"
                    name="field_name"
                    value={formData.field_name}
                    onChange={handleChange}
                    error={errors.field_name}
                    icon={<FiBook className="text-gray-400" />}
                  />
                  {errors.field_name && (
                    <span className="text-xs text-red-600 absolute -bottom-5 left-0">
                      {errors.field_name}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <InputField
                    label="Experience"
                    placeholder="2 ( in years )"
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    error={errors.experience}
                    icon={<FiBriefcase className="text-gray-400" />}
                  />
                  {errors.experience && (
                    <span className="text-xs text-red-600 absolute -bottom-5 left-0">
                      {errors.experience}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <InputField
                    name="password"
                    label="Password"
                    placeholder="Create password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    showPassword={showPassword}
                    setShowPassword={() => setShowPassword(!showPassword)}
                    error={errors.password}
                    icon={<FiLock className="text-gray-400" />}
                  />
                  {errors.password && (
                    <span className="text-xs text-red-600 absolute -bottom-5 left-0">
                      {errors.password}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <InputField
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    showPassword={showConfirmPassword}
                    setShowPassword={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    error={errors.confirmPassword}
                    icon={<FiLock className="text-gray-400" />}
                  />
                  {errors.confirmPassword && (
                    <span className="text-xs text-red-600 absolute -bottom-5 left-0">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center mt-4 mb-6">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#ff5722] border-gray-300 focus:ring-[#ff5722]"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <label className="ml-2 text-xs text-gray-600">
                  I Agree with all of your{" "}
                  <a href="#" className="text-[#ff5722] hover:underline">
                    Terms & Conditions
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                text={isLoading ? "" : "Submit"}
                className="flex items-center justify-center gap-2 shadow-md w-full"
                disabled={
                  !isFormValid ||
                  !formData.full_name ||
                  !formData.phone ||
                  !formData.password ||
                  !formData.email ||
                  !formData.user_name ||
                  !formData.confirmPassword ||
                  !formData.agreeTerms ||
                  !formData.experience ||
                  !formData.field_name ||
                  isLoading
                }
              >
                {isLoading ? (
                  <Spinner size="small" />
                ) : (
                  <FiArrowRight className="w-4 h-4" />
                )}
              </Button>
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

export default TutorSignup;

