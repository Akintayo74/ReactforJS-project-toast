import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

import ToastShelf from '../ToastShelf';

import Toast from '../Toast';

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('notice');
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

  function handleDismiss(id) {
    const dismissToasts = toasts.filter((toast) => {
      return toast.id !== id;
    })

    setToasts(dismissToasts);
    console.log('clicked')
  }

  function handleCreateToast(event) {
    event.preventDefault();

    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      }
    ]
    setToasts(nextToasts);

    setMessage('');
    setVariant('notice');
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />

      <form 
        className={styles.controlsWrapper}
        onSubmit={handleCreateToast}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea 
            id="message" 
            className={styles.messageInput} 
            value={message}
            onChange={(event) => {
              setMessage(event.target.value)
            }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
          
            {VARIANT_OPTIONS.map(option => {
              const id = `variant-${option}`

              return (
                <label htmlFor={id} key={id}>
                  <input
                    id={id}
                    type="radio"
                    name={option}
                    value={option}
                    checked={option === variant}
                    onChange={(event) => {
                      setVariant(event.target.value);
                    }}
                  />
                  {option}
                </label>
              )
            })}

          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button >
              Pop Toast!
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
