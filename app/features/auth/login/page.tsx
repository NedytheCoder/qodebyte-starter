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
    // Enable button if both email and password have at least one character
    const hasEmail = formData.email.trim().length > 0;
    const hasPassword = formData.password.length > 0;
    const isValid = hasEmail && hasPassword;

    setIsFormValid(isValid);
    return isValid;
  };

  // Update form validity when email or password changes
  useEffect(() => {
    validateForm();
  }, [formData.email, formData.password]);

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
      case "password":
        isValid = isPasswordValid(value);
        break;
      case "confirmPassword":
        isValid = value === formData.password && value !== "";
        break;
      case "acceptTerms":
        // For checkbox values, we need to handle boolean comparison
        isValid = formData.acceptTerms === true;
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
            Log into your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/features/auth/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create a new account
            </Link>
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
            <div>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  handleBlur(e);
                  setIsPasswordFocused(false);
                  // Mark the field as validated when it loses focus
                  setValidatedFields((prev) => new Set([...prev, "password"]));
                }}
                onFocus={() => setIsPasswordFocused(true)}
                className={getFieldValidity("password", formData.password)}
                label="Password"
              />
              {touched.password && formData.password.length === 0 && (
                <span className="text-red-400">Password is required</span>
              )}

              <div className="flex justify-end mt-1">
                <Link
                  href="/features/auth/forgotpassword"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>

              {/* {isPasswordFocused && (
                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-medium mb-1">Password must contain:</p>
                  <ul className="space-y-1">
                    <li
                      className={`flex items-center ${
                        passwordRequirements.hasMinLength
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      <span className="mr-2">•</span>
                      <span>At least 8 characters</span>
                    </li>
                    <li
                      className={`flex items-center ${
                        passwordRequirements.hasUppercase
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      <span className="mr-2">•</span>
                      <span>At least one uppercase letter</span>
                    </li>
                    <li
                      className={`flex items-center ${
                        passwordRequirements.hasLowercase
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      <span className="mr-2">•</span>
                      <span>At least one lowercase letter</span>
                    </li>
                    <li
                      className={`flex items-center ${
                        passwordRequirements.hasNumber
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      <span className="mr-2">•</span>
                      <span>At least one number</span>
                    </li>
                    <li
                      className={`flex items-center ${
                        passwordRequirements.hasSpecialChar
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      <span className="mr-2">•</span>
                      <span>At least one special character</span>
                    </li>
                  </ul>
                </div>
              )} */}
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-6">
            <RegularButton
              type="submit"
              label="Login"
              loading={isLoading}
              disabled={!isFormValid || isLoading}
              className={`w-full ${
                isFormValid && !isLoading
                  ? "hover:bg-indigo-700"
                  : "opacity-70 cursor-not-allowed"
              }`}
            />
          </div>
          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <RegularButton
                type="button"
                onClick={() => console.log("Continue with Google")}
                className="text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
                label={
                  <>
                    <span className="font-bold">G</span>
                    <span>oogle</span>
                  </>
                }
              />
              <RegularButton
                type="button"
                onClick={() => console.log("Continue with Facebook")}
                className="text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
                label={
                  <>
                    <span className="font-bold">F</span>
                    <span>acebook</span>
                  </>
                }
              />
            </div>
          </div>
        </form>
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
