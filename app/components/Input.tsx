"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import styles from "./Input.module.css";

type Option = {
  value: string;
  label: string;
};

interface SelectDropdownProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label: string;
  error?: boolean;
  name?: string;
  required?: boolean;
}

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  helperText?: string;
  error?: boolean;
  className?: string;
  inputRef?: (instance: HTMLInputElement | null) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className = "", error = false, label, inputRef, helperText, ...props },
    ref
  ) => {
    const inputClasses = [
      styles.inputGroup,
      className,
      error ? styles.error : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={inputClasses}>
        <input
          ref={(el) => {
            // Handle the forwarded ref
            if (typeof ref === "function") {
              ref(el);
            } else if (ref) {
              ref.current = el;
            }
            // Handle the inputRef prop if provided
            if (inputRef) {
              inputRef(el);
            }
          }}
          autoComplete="off"
          className={`${error ? styles.error : ""}`}
          {...props}
        />
        {label && (
          <label htmlFor={props.name} className={error ? styles.error : ""}>
            {label}
          </label>
        )}
        {helperText && (
          <p className="mt-1 text-sm text-red-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label: string;
  error?: boolean;
  className?: string;
}

export function Textarea({
  className = "",
  error = false,
  ...props
}: TextareaProps) {
  const inputClasses = [styles.inputGroup, className, error ? styles.error : ""]
    .filter(Boolean)
    .join(" ");

  // Extract textarea props to avoid passing them to the div
  const { label, ...textareaProps } = props;

  return (
    <div className={inputClasses}>
      <textarea
        autoComplete="off"
        className={error ? styles.error : ""}
        {...textareaProps}
      />
      <label htmlFor={textareaProps.name} className={error ? styles.error : ""}>
        {label}
      </label>
    </div>
  );
}

export function SelectDropdown({
  className = "",
  error = false,
  onChange,
  ...props
}: SelectDropdownProps) {
  const inputClasses = [styles.inputGroup, className, error ? styles.error : ""]
    .filter(Boolean)
    .join(" ");

  // Extract select props to avoid passing them to the div
  const { label, options, ...selectProps } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={inputClasses}>
      <select
        autoComplete="off"
        className={`${error ? styles.error : ""} bg-gray-700 p-4 rounded-md`}
        onChange={handleChange}
        {...selectProps}
      >
        <option key={""} value={""} className="disabled">
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="">
            {option.label}
          </option>
        ))}
      </select>
      {/* <label htmlFor={selectProps.name} className={error ? styles.error : ""}>
        {label}
      </label> */}
    </div>
  );
}

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const { className = "", ...rest } = props;

    return (
      <div className="relative w-full">
        <div className="relative w-full">
          <Input
            ref={ref}
            type={showPassword ? "text" : "password"}
            {...rest}
            className={`${className} w-full`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/sv"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export function Searchbar({
  className = "",
  error = false,
  onSearch,
  ...props
}: InputProps & { onSearch?: (value: string) => void }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchValue);
    onSearch?.(searchValue);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative">
        <Input
          type="search"
          autoComplete="off"
          className={`${className} pr-10`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          error={error}
          {...props}
        />
        <button
          type="submit"
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border-2 rounded-full"
          aria-label="Search"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
