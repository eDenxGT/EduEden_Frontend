/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { axiosInstance } from "../api/axiosConfig";
import { useRazorpay } from "react-razorpay";
import EduEdenLogo from "/EduEden.png";
import { useDispatch } from "react-redux";
import { getStudentDetails } from "../store/thunks/studentThunks";
import { useNavigate } from "react-router-dom";

const RazorpayButton = ({
  courses,
  student_id,
  amount,
  className,
  handleSuccess,
}) => {
  const { error, isLoading, Razorpay } = useRazorpay();
  const dispatch = useDispatch();

  const handlePayment = async () => {
    try {
      const { data } = await axiosInstance.post("/payment/create-order", {
        amount: Math.round(amount * 100),
        courses,
        student_id,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "EduEden",
        description: "Course Payment",
        order_id: data.id,
        image: EduEdenLogo,
        handler: async (response) => {
          const verificationData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const result = await axiosInstance.post(
            "/payment/verify-payment",
            verificationData
          );

          if (result.data.success) {
            toast.success("Payment successful!");
            dispatch(getStudentDetails(student_id));
            handleSuccess();
          } else {
            toast.error("Payment failed!");
          }
        },
        prefill: {
          name: "STUDENT NAME",
          email: "student@edueden.in",
          contact: "1234567890",
        },
        theme: {
          color: "#000000",
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <button onClick={handlePayment} className={className}>
      Pay Now
    </button>
  );
};

export default RazorpayButton;
