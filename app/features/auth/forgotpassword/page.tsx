"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/Input";
import { RegularButton } from "@/app/components/Button";
import DynamicOTP from "../DynamicOTP";

const Page = () => {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("OTP sent to:", email);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("email", email);
      }
      setShowOTPModal(true);
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
      console.error("Password reset error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-gray-800 justify-center w-screen h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="text-red-700">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>
          </div>

          <div>
            <RegularButton
              type="submit"
              label={isLoading ? "Sending OTP..." : "Send OTP"}
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 text-base"
            />
          </div>
        </form>

        <div className="text-center text-sm">
          <Link
            href="/features/auth/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to sign in
          </Link>
        </div>
      </div>
      {showOTPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <DynamicOTP
              description="Enter the OTP sent to your email to reset your password"
              onVerify={async (otp) => {
                try {
                  console.log("Verifying OTP:", otp, "for email:", email);
                  // Simulate API verification
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  // On successful verification
                  setShowOTPModal(false);
                  // Navigate to reset password page or show success message
                  router.push("/features/auth/resetpassword");
                  return true;
                } catch (error) {
                  console.error("OTP verification failed:", error);
                  return false;
                }
              }}
              onClose={() => setShowOTPModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
