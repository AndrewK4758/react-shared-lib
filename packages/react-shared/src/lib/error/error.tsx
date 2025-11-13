import { memo, type HTMLAttributes } from 'react';
import styles from './error.module.css';

interface BtgErrorProps extends HTMLAttributes<HTMLSpanElement> {
  touched: boolean | undefined;
  error: string | undefined;
}

export const BtgError = memo(function ({
  touched,
  error,
  ...props
}: BtgErrorProps) {
  return (
    <div className={styles['inputError']}>
      {touched && error && (
        <span
          {...props}
          className={styles['error']}
          style={props.style}
        >{`ERROR: ${error}`}</span>
      )}
    </div>
  );
});

export default BtgError;
