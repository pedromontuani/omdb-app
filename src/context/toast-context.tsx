import React, { createContext, useContext, useCallback, useState } from 'react';
import Toast from '../components/toast';

export type ToastMessage = {
  type: 'warning' | 'success';
  title?: string;
  message: string;
  showCloseButton?: boolean;
  show?: boolean;
  duration?: number;
};

type ToastContextData = {
  showToast: (message: ToastMessage) => void;
  hideToast: () => void;
  message: ToastMessage;
};

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState<ToastMessage>({} as ToastMessage);

  const showToast = useCallback(
    ({
      type,
      title,
      message: msg,
      showCloseButton = false,
      duration = 4000,
    }: ToastMessage) => {
      setMessage({
        type,
        title,
        message: msg,
        showCloseButton,
        show: true,
        duration,
      });
    },
    [],
  );

  const hideToast = useCallback(() => {
    setMessage({} as ToastMessage);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, message }}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}
