import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastTypes = {
  success: 'SUCCESS',
  error: 'ERROR',
  info: 'INFO',
  warning: 'WARNING'
};

const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

const showToast = (message, type = toastTypes.info) => {
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
