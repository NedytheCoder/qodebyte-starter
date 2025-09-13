"use client";

import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import Toast from "@/app/components/Toast";
import { useRouter } from "next/navigation";
import { RegularButton } from "@/app/components/Button";

interface OTPModalProps {
  apiEndpoint?: string;
  description: string;
  onVerify?: (otp: string) => Promise<boolean>;
  onClose?: () => void;
  toRoute?: string;
}

const OTPModal: React.FC<OTPModalProps> = ({
  description,
  apiEndpoint,
  onVerify,
  onClose,
  toRoute,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value) {
      if (index < 5) {
        // Move to next input if not the last one
        inputRefs.current[index + 1]?.focus();
      } else if (index === 5) {
        // If this is the last input, directly call the submit handler
        // const otpCode = [...newOtp];
        setTimeout(() => {
          handleSubmit(e as unknown as React.FormEvent);
        }, 0);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    const otpCode = otp.join("");
    console.log("Submitting OTP:", otpCode);
    try {
      setIsSubmitting(true);
      console.log(apiEndpoint);

      // Call the onVerify prop if provided
      if (onVerify) {
        const isVerified = await onVerify(otpCode);
        if (isVerified) {
          toast.success("OTP verified successfully");
          // Close the modal after a short delay
          setTimeout(() => {
            const modal = document
              .querySelector(".modal-content")
              ?.closest(".fixed");
            if (toRoute) router.push(toRoute);
            if (modal) {
              modal.classList.add("opacity-0", "pointer-events-none");
              setTimeout(() => {
                modal.remove();
              }, 300);
            }
          }, 1000);
        }
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 flex items-center justify-center z-50">
      <div className="bg-white p-2 md:p-8 rounded-lg w-[95%] md:w-[50%] relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 w-full overflow-hidden">
          <div className="flex justify-center items-center w-full md:gap-2 gap-1">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                className="text-gray-800 border border-gray-300 rounded-sm p-2 w-[50px] text-center"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                ref={setInputRef(index)}
              />
            ))}
          </div>

          <div className="mt-4 text-center text-sm">
            <button className="text-blue-600 hover:text-blue-500">
              Resend OTP
            </button>
          </div>
          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
          )}
          <RegularButton
            type="submit"
            disabled
            label={isSubmitting ? "Verifying..." : "Verify OTP"}
            className={`mt-6 w-full rounded-lg  px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          />
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Didn&apos;t receive a code?{" "}
          <button
            onClick={() => alert("Resend OTP functionality to be implemented")}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Resend code
          </button>
        </p>
      </div>
      <Toast />
    </div>
  );
};

export default OTPModal;
