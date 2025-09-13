"use client";

import { useEffect, useState } from "react";
import { Input, PasswordInput } from "@/app/components/Input";
import { RegularButton } from "@/app/components/Button";
import Link from "next/link";
import DynamicOTP from "../DynamicOTP";

interface PasswordRequirements {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

const Page = () => {
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    rememberMe: false,
  });

  const [touched, setTouched] = useState({
    email: true,
    password: false,
  });

  const [validatedFields, setValidatedFields] = useState<Set<string>>(
    new Set()
  );
  const [currentField, setCurrentField] = useState<string>("firstName");

  const [passwordRequirements, setPasswordRequirements] =
    useState<PasswordRequirements>({
      hasMinLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecialChar: false,
    });

  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  interface FormErrors {
    firstName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
  }

  const [errors, setErrors] = useState<FormErrors>({});

  // Check password requirements
  const checkPasswordRequirements = (password: string) => {
    setPasswordRequirements({
      hasMinLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  // Check if all password requirements are met
  const isPasswordValid = (password: string) => {
    const requirements = {
      hasMinLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    return Object.values(requirements).every(Boolean);
  };

  // Check if form is valid
  const validateForm = () => {
    // Enable button if email is valid
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    setIsFormValid(isEmailValid);
    return isEmailValid;
  };

  // Update form validity when email changes
  useEffect(() => {
    validateForm();
  }, [formData.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Mark field as touched
    if (!touched[name as keyof typeof touched]) {
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
    }

    // If field is empty, make it the current field for validation
    if (!fieldValue && name !== currentField) {
      setCurrentField(name);
      setValidatedFields((prev) => {
        const newSet = new Set(prev);
        newSet.delete(name);
        return newSet;
      });
    }

    // Check password requirements when password changes
    if (name === "password") {
      checkPasswordRequirements(value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // If the field is empty, make it the current field for validation
    if (!formData[name as keyof typeof formData]) {
      setCurrentField(name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      console.log("Login attempt with:", {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show OTP modal after successful login attempt
      setShowOTPModal(true);
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prev) => ({
        ...prev,
        email: "An error occurred during login",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Check if field is valid and return a class name based on validation
  const getFieldValidity = (fieldName: string, value: string): string => {
    // Only validate the current field or already validated fields
    if (fieldName !== currentField && !validatedFields.has(fieldName)) {
      return "";
    }

    if (!value) return "error"; // Return error class if value is empty

    let isValid = false;
    switch (fieldName) {
      case "email":
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      default:
        isValid = value.trim() !== "";
    }

    // If field is valid and it's the current field, move to next field
    if (isValid && fieldName === currentField) {
      const fieldOrder = [
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmPassword",
      ];
      const currentIndex = fieldOrder.indexOf(fieldName);
      if (currentIndex < fieldOrder.length - 1) {
        const nextField = fieldOrder[currentIndex + 1];
        setCurrentField(nextField);
        setTouched((prev) => ({ ...prev, [nextField]: true }));
      }
      setValidatedFields((prev) => new Set([...prev, fieldName]));
    }

    return isValid ? "success" : "error"; // Return appropriate class based on validation
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:w-[65%] space-y-6 sm:space-y-8 bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg transition-all duration-200 mx-2 sm:mx-4">
        {/* Header */}
        <div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address
          </p>
        </div>

        {/* Error Banner */}
        {errors.email && errors.email.includes("error occurred") && (
          // <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="bg-red-50 border-l-4 p-4">
            <div className="flex">
              <div className="">
                {/* <div className="text-red-700"> */}
                <p className="text-sm">{errors.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          className="mt-6 sm:mt-8 space-y-3 sm:space-y-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex flex-col gap-2 w-full">
            {/* Email */}
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.email &&
                  (!formData.email ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                }
                className={getFieldValidity("email", formData.email)}
                label="Email"
                helperText={
                  touched.email &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                    ? "Input a valid email"
                    : ""
                }
              />
              {/* {touched.email && !formData.email && (
                <p className="mt-1 ml-3 text-sm text-red-600">
                  Email is required
                </p>
              )} */}
              {/* {touched.email &&
                formData.email &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                  <span className="ml-3 text-sm text-red-600">
                    Please enter a valid email address
                  </span>
                )} */}
            </div>

            {/* Password */}
          </div>
          {/* Submit Button */}
          <div className="mt-6">
            <RegularButton
              type="submit"
              label="Request OTP"
              loading={isLoading}
              disabled={!isFormValid}
              className={`w-full ${
                isFormValid
                  ? "hover:bg-indigo-700 cursor-pointer"
                  : "opacity-70 cursor-not-allowed"
              }`}
            />
          </div>
        </form>
        <div className="text-center text-indigo-700 text-sm">
          <p>
            Back to <Link href="/features/auth/login">Sign In</Link>
          </p>
        </div>
      </div>
      {showOTPModal && (
        <DynamicOTP
          description={`Enter the OTP sent to ${formData.email} to login`}
          toRoute="/"
          apiEndpoint="/api/auth/login"
          onVerify={async (otp: string) => {
            console.log("Verifying OTP:", otp, "for email:", formData.email);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return true;
          }}
          //     onVerify={async (otp: string) => {
          //       try {
          //         const response = await fetch('/api/auth/verify-otp', {
          //           method: 'POST',
          //           headers: {
          //             'Content-Type': 'application/json',
          //           },
          //           body: JSON.stringify({
          //             email: formData.email,
          //             otp,
          //           }),
          //         });

          //         const data = await response.json();

          //         if (!response.ok) {
          //           throw new Error(data.message || 'Failed to verify OTP');
          //         }

          //         return data.success === true;
          //       } catch (error) {
          //         console.error('OTP verification failed:', error);
          //         return false;
          //       }
          //     }}
          //   />
          // )}
        />
      )}
    </div>
  );
};

export default Page;
