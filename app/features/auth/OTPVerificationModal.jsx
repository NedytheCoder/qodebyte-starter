import { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

const OTPVerificationModal = ({ 
  email = 'user@example.com',
  onVerify = (otp) => console.log('Verifying OTP:', otp),
  onResend = () => console.log('Resending OTP...'),
  onClose = () => {}, api
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOtpChange = (e, index) => {
    if (e.target.value && isNaN(e.target.value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    
    // Move to next input
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }
    
    setError('');
    setIsLoading(true);
    onVerify(code);
  };

  const handleResend = () => {
    setError('');
    onResend();
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Account</h2>
          <p className="text-gray-600 mb-6">
            Enter the verification code sent to: <span className="font-medium">{email}</span>
          </p>
          
          {error && (
            <div className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-2 mb-6">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  className="w-12 h-12 text-center text-xl rounded-md"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  disabled={isLoading}
                />
              ))}
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                label={isLoading ? 'Verifying...' : 'Verify Code'}
                disabled={isLoading}
                className="w-full"
              />
              
              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Resend Code
                </button>
              </div>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm text-gray-600 hover:text-gray-800"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationModal;