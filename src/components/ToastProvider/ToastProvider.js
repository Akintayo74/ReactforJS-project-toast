import React from 'react';

import useKeydown from '../../hooks/useKeydown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      message: 'not found',
      variant: 'error',
    },
    {
      id: crypto.randomUUID(),
      message: 'hello!',
      variant: 'success',
    }
  ]);

  const handleEscape = React.useCallback(() => {
   setToasts([]); 
  }, [])

  useKeydown('Escape', handleEscape);

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      }
    ]

    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const dismissToasts = toasts.filter((toast) => {
      return toast.id !== id;
    })

    setToasts(dismissToasts);
  }

  value = {
    toasts,
    // setToasts,
    createToast,
    dismissToast,
  };

  return (
    <ToastContext.Provider value={value}>
      { children }
    </ToastContext.Provider>
  );
}

export default ToastProvider;
