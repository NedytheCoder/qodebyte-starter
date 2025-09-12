import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';

const DynamicOTP = ({
  apiEndpoint = '/api/verify-otp',
  email = 'johndoe@email.com',
  description = 'Enter the 6-digit code we sent you',
  otpLength = 6,
  autoSubmit = true,
  onSuccess = () => console.log('OTP verified successfully!'),
  onError = (error) => console.error('OTP verification failed:', error),
  resendApiEndpoint = '/api/resend-otp'
}) => {
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendDisabled]);

  useEffect(() => {
    if (autoSubmit && otp.every(digit => digit !== '') && otp.length === otpLength) {
      handleSubmit();
    }
  }, [otp, autoSubmit, otpLength]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Only take the last character
    setOtp(newOtp);

    // Move to next input
    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const code = otp.join('');
    if (code.length !== otpLength) {
      setError(`Please enter all ${otpLength} digits`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      console.log('Verifying OTP with endpoint:', apiEndpoint);
      console.log('OTP:', code);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success
      onSuccess({ code, email });
    } catch (err) {
      console.error('Verification error:', err);
      setError('Invalid OTP. Please try again.');
      onError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;

    try {
      setResendDisabled(true);
      setResendTimer(30);
      console.log('Resending OTP to:', email);
      
      if (resendApiEndpoint) {
        // Simulate API call to resend OTP
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('OTP resent successfully');
      }
    } catch (err) {
      console.error('Error resending OTP:', err);
      setError('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Verify OTP
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {description}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {email}
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
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-xl rounded-full"
                disabled={isLoading}
              />
            ))}
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              label={isLoading ? 'Verifying...' : 'Verify'}
              disabled={isLoading}
              className="w-full"
            />

            {resendApiEndpoint && (
              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={resendDisabled}
                  className={`font-medium ${
                    resendDisabled 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-indigo-600 hover:text-indigo-500'
                  }`}
                >
                  {resendDisabled 
                    ? `Resend code in ${resendTimer}s` 
                    : "Didn't receive a code? Resend"}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicOTP;