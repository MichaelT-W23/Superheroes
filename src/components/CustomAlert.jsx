import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/CustomAlert.module.css';

const CustomAlert = ({ 
  message, 
  subtext = '', 
  onClose, 
  action, 
  closeButtonColor = 'red', 
  buttonText = 'Close', 
  cancelButton = false
}) => {

  const [visible, setVisible] = useState(true);

  const handleOnlyClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const handleMainButton = () => {
    setVisible(false);
    if (onClose) onClose();
    if (action) action();
  };

  const handleCancelButton = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.modal}>
        <button className={styles['close-button']} onClick={handleOnlyClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" stroke="currentColor" strokeWidth="2" d="M3 3L21 21M3 21L21 3" />
          </svg>
        </button>
        <div className={styles['message-container']}>
          <span
            className={styles['alert-msg']}
            dangerouslySetInnerHTML={{ __html: message }}
          />
          {subtext && <div className={styles['sub-msg']}>{subtext}</div>}
        </div>
        {cancelButton && (
          <div className={styles['button-container']}>
            <button
              className={styles['cancel-button']}
              onClick={handleCancelButton}
            >
              Cancel
            </button>
            <button
              style={{ backgroundColor: closeButtonColor }}
              className={styles['alert-button']}
              onClick={handleMainButton}
            >
              {buttonText}
            </button>
          </div>
        )}
        {!cancelButton && (
          <button
            style={{ backgroundColor: closeButtonColor }}
            className={styles['alert-button']}
            onClick={handleMainButton}
          >
            {buttonText}
          </button>
        )}
      </div>
    </>
  );
};

CustomAlert.propTypes = {
  message: PropTypes.string.isRequired,
  subtext: PropTypes.string,
  onClose: PropTypes.func,
  action: PropTypes.func,
  closeButtonColor: PropTypes.string,
  buttonText: PropTypes.string,
  cancelButton: PropTypes.bool,
};

export default CustomAlert;
