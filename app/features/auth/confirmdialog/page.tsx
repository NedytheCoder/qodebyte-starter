"use client";

import { RegularButton } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import React from "react";

interface ConfirmDialogProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonLink?: string;
}

const Page = ({
  title = "Password Reset Successful",
  description = "Your password has been successfully updated. You can now sign in with your new password.",
  buttonLabel = "Back to Sign In",
  buttonLink = "/features/auth/login",
}: ConfirmDialogProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center bg-gray-800 h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div className="mt-6">
          <RegularButton
            onClick={() => router.push(buttonLink)}
            label={buttonLabel}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
