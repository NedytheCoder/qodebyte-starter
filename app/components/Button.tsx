import Spinner from "./Spinner";

export function RegularButton({
  label,
  className = "",
  loading = false,
  disabled = false,
  ...props
}: {
  label: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  [key: string]: unknown;
}) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        ${className} 
        relative rounded-lg border border-transparent px-4 py-2 
        text-base font-medium bg-gray-900 text-white
        transition-colors duration-200 
        ${
          disabled || loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-indigo-700 cursor-pointer"
        }
        focus:outline-none focus:ring-4 focus:ring-blue-300
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner className="h-5 w-5 mr-2 text-white" />
          <span>{label}</span>
        </div>
      ) : (
        label
      )}
    </button>
  );
}

export function DangerButton({
  label,
  className = "",
  loading = false,
  disabled = false,
  ...props
}: {
  label: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  [key: string]: unknown;
}) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        ${className}
        relative rounded-lg border border-transparent px-5 py-2.5 
        text-base font-medium font-sans bg-red-600 text-white
        transition-colors duration-200
        ${
          disabled || loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-red-700 cursor-pointer"
        }
        focus:outline-none focus:ring-4 focus:ring-red-300
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner className="h-5 w-5 mr-2 text-white" />
          <span>{label}</span>
        </div>
      ) : (
        label
      )}
    </button>
  );
}

export function SecondaryButton({
  label,
  className = "",
  loading = false,
  disabled = false,
  ...props
}: {
  label: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  [key: string]: unknown;
}) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        ${className} 
        relative rounded-lg border border-transparent px-5 py-2.5 
        text-base font-medium font-sans bg-gray-600 text-white
        transition-colors duration-200 
        ${
          disabled || loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-indigo-900 cursor-pointer"
        }
        focus:outline-none focus:ring-4 focus:ring-blue-300
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner className="h-5 w-5 mr-2 text-white" />
          <span>{label}</span>
        </div>
      ) : (
        label
      )}
    </button>
  );
}
