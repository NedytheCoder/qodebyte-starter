import { useEffect } from 'react';
import { ToastContainer, toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastTypes = {
  success: 'SUCCESS',
  error: 'ERROR',
  info: 'INFO',
  warning: 'WARNING'
} as const;

type ToastType = (typeof toastTypes)[keyof typeof toastTypes];

const toastConfig = {
  position: 'top-right' as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light' as 'light' | 'dark' | 'colored',
};

const showToast = (message: string, type: ToastType = toastTypes.info) => {
  switch (type) {
    case toastTypes.success:
      toast.success(message, toastConfig);
      break;
    case toastTypes.error:
      toast.error(message, { ...toastConfig, autoClose: 10000 }); // Longer display for errors
      break;
    case toastTypes.warning:
      toast.warn(message, toastConfig);
      break;
    default:
      toast.info(message, toastConfig);
  }
};

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export { Toast, showToast, toastTypes };

export default Toast;
