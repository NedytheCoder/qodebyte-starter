"use client";

import { useState } from "react";
import { Input } from "@/app/components/Input";
import { RegularButton } from "@/app/components/Button";
import { useRouter } from "next/navigation";

interface PasswordRequirements {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordRequirements, setPasswordRequirements] =
    useState<PasswordRequirements>({
      hasMinLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecialChar: false,
    });

  const checkPasswordRequirements = (password: string) => {
    const requirements = {
      hasMinLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordRequirements(requirements);
    return Object.values(requirements).every(Boolean);
  };

  const validateForm = () => {
    if (!formData.password) {
      setError("Password is required");
      return false;
    }

    if (!checkPasswordRequirements(formData.password)) {
      setError("Password does not meet all requirements");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      checkPasswordRequirements(value);
    }

    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(
        "Password reset with token:",
        "for email: ",
        sessionStorage.getItem("email")
      );
      router.push("/features/auth/confirmdialog");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      console.error("Password reset error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-gray-800 h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your new password below.
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
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
                className={`${
                  formData.password
                    ? Object.values(passwordRequirements).every(Boolean)
                      ? "border-green-500"
                      : "border-red-500"
                    : ""
                }`}
              />
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700">
                  Password must contain:
                </p>
                <ul className="space-y-1 text-sm mt-1">
                  <li
                    className={`flex items-center ${
                      passwordRequirements.hasMinLength
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {passwordRequirements.hasMinLength ? "✓" : "•"} At least 8
                    characters
                  </li>
                  <li
                    className={`flex items-center ${
                      passwordRequirements.hasUppercase
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {passwordRequirements.hasUppercase ? "✓" : "•"} At least one
                    uppercase letter
                  </li>
                  <li
                    className={`flex items-center ${
                      passwordRequirements.hasLowercase
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {passwordRequirements.hasLowercase ? "✓" : "•"} At least one
                    lowercase letter
                  </li>
                  <li
                    className={`flex items-center ${
                      passwordRequirements.hasNumber
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {passwordRequirements.hasNumber ? "✓" : "•"} At least one
                    number
                  </li>
                  <li
                    className={`flex items-center ${
                      passwordRequirements.hasSpecialChar
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {passwordRequirements.hasSpecialChar ? "✓" : "•"} At least
                    one special character
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <RegularButton
              type="submit"
              label={isLoading ? "Updating Password..." : "Reset Password"}
              disabled={
                isLoading ||
                !Object.values(passwordRequirements).every(Boolean) ||
                formData.password !== formData.confirmPassword
              }
              className="w-full flex justify-center py-2.5 text-base"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
