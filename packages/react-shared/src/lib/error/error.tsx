import { memo } from 'react';
import styles from './error.module.css';

interface BtgErrorProps {
  touched: boolean;
  error: string | undefined;
}

export const BtgError = memo(function ({ touched, error }: BtgErrorProps) {
  return (
    <div className={styles['inputError']}>
      {touched && error && (
        <span className={styles['error']}>{`ERROR: ${error}`}</span>
      )}
    </div>
  );
});

export default BtgError;
