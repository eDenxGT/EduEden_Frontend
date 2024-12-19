/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { axiosInstance } from "../api/axiosConfig";
import { useRazorpay } from "react-razorpay";
import EduEdenLogo from "/image/EduEden.png";
import { useDispatch } from "react-redux";
import { getStudentDetails } from "../store/thunks/studentThunks";
import { useRef } from "react";

const RazorpayButton = ({
  courses,
  student_id,
  amount,
  className,
  handleSuccess,
}) => {
  const { Razorpay } = useRazorpay();
  const dispatch = useDispatch();
  const isPaymentFailedRef = useRef(false); 

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
        retry: {
          enabled: false,
        },

        handler: async (response) => {
          try {
            console.log(response)
            isPaymentFailedRef.current = false;
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
              toast.error("Payment verification failed. Please try again.");
            }
          } catch (verificationError) {
            console.error("Payment Verification Error:", verificationError);

            toast.error(
              "Something went wrong during payment verification. Please try again."
            );
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

        modal: {
          ondismiss: async () => {
            if (!isPaymentFailedRef.current) {
              toast.info("Payment Cancelled!");
              console.log("Payment modal closed");
            }
            await axiosInstance.put("/payment/update-status", {
              order_id: data.id,
              status: "cancelled",
            });
            isPaymentFailedRef.current = false;
          },
        },
      };

      const razorpayInstance = new Razorpay(options);

      razorpayInstance.on("payment.failed", (errorResponse) => {
        isPaymentFailedRef.current = true;

        console.error("Payment Failed:", errorResponse);

        const { code, description, reason, metadata } = errorResponse.error;

        console.log("Error Details:", {
          code,
          description,
          reason,
          payment_id: metadata.payment_id,
          order_id: metadata.order_id,
        });

        if (reason === "payment_failed") {
          toast.error(description || "Payment failed. Please try another method.");
        } else if (reason === "payment_authorization") {
          toast.error(
            "Your payment was declined by the bank. Please try another method."
          );
        } else {
          toast.error(description || "An unexpected error occurred during payment.");
        }

        // razorpayInstance.close();
      });

      razorpayInstance.open();
    } catch (error) {
      console.error("Payment Error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while initiating the payment. Please try again later."
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
