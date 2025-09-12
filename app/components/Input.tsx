import styles from "./Input.module.css";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  error?: boolean;
  className?: string;
}

export default function Input({
  className = "",
  error = false,
  ...props
}: InputProps) {
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
