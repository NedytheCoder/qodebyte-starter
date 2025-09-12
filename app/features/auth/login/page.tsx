"use client";

import { useEffect, useState } from "react";
import { Input } from "@/app/components/Input";
import { RegularButton } from "@/app/components/Button";
import Link from "next/link";

interface PasswordRequirements {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

const Page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
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
    // Only validate fields that have been marked as validated or are the current field
    const fieldsToValidate = [...validatedFields];
    if (currentField) {
      fieldsToValidate.push(currentField);
    }

    let isValid = true;
    for (const field of fieldsToValidate) {
      const value = formData[field as keyof typeof formData];

      switch (field) {
        case "email":
          isValid =
            isValid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string);
          break;
        case "password":
          isValid = isValid && isPasswordValid(value as string);
          break;
        case "confirmPassword":
          isValid = isValid && value === formData.password && value !== "";
          break;
        case "acceptTerms":
          isValid = isValid && value === true;
          break;
        default:
          isValid = isValid && (value as string).trim() !== "";
      }

      if (!isValid) break; // Stop at first invalid field
    }

    // Only check acceptTerms if all other fields are valid
    if (isValid && fieldsToValidate.length >= 5) {
      isValid = formData.acceptTerms;
    }

    setIsFormValid(isValid);
    return isValid;
  };

  // Update form validity when form data or validation state changes
  useEffect(() => {
    validateForm();
  }, [formData, touched, currentField, validatedFields]);

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
      // TODO: Implement actual signup logic here
      console.log("Signup attempt with:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // navigate("/login", { state: { registered: true } });
    } catch (error) {
      console.error("Signup error:", error);
      setErrors((prev) => ({
        ...prev,
        email: "An error occurred during signup",
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
    <div className="h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[65%] space-y-8 bg-white p-8 rounded-xl shadow-lg transition-all duration-200">
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
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
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="text-red-700">
                <p className="text-sm">{errors.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-3" onSubmit={handleSubmit} noValidate>
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
              {touched.email &&
                formData.email &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                  <span className="ml-3 text-sm text-red-600">
                    Please enter a valid email address
                  </span>
                )}
            </div>

            {/* Password */}
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
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
                error={
                  touched.password &&
                  !isPasswordValid(formData.password) &&
                  formData.password.length > 0
                }
                label="Password"
              />

              {isPasswordFocused && (
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
              )}
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-6">
            <RegularButton
              type="submit"
              label="Login"
              loading={isLoading}
              disabled={!isFormValid}
              className="w-full hover:bg-indigo-700"
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
    </div>
  );
};

export default Page;
