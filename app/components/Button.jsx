import Spinner from './Spinner';

export default function Button({ 
  label, 
  className = '', 
  loading = false, 
  disabled = false, 
  ...props 
}) {
  return (
    <button 
      {...props}
      disabled={disabled || loading}
      className={`
        ${className} 
        relative rounded-lg border border-transparent px-5 py-2.5 
        text-base font-medium font-sans bg-gray-900 text-white
        transition-colors duration-200 
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-400 cursor-pointer'}
        focus:outline-none focus:ring-4 focus:ring-blue-300
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner className="h-5 w-5 mr-2 text-white" />
          <span>{label}</span>
        </div>
      ) : label}
    </button>
  );
}
  