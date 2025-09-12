"use client";

import { useState } from "react";
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
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  error?: boolean;
  className?: string;
}

export function Input({ className = "", error = false, ...props }: InputProps) {
  const inputClasses = [styles.inputGroup, className, error ? styles.error : ""]
    .filter(Boolean)
    .join(" ");

  // Extract input props to avoid passing them to the div
  const { label, ...inputProps } = props;

  return (
    <div className={inputClasses}>
      <input
        autoComplete="off"
        className={error ? styles.error : ""}
        {...inputProps}
      />
      <label htmlFor={inputProps.name} className={error ? styles.error : ""}>
        {label}
      </label>
    </div>
  );
}

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
