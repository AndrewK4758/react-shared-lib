import { type HTMLAttributes, memo, type ReactNode } from 'react';
import styles from './error.module.css';
import type { OptionType } from '../../types/types';

interface BtgErrorProps extends HTMLAttributes<HTMLSpanElement> {
  touched: boolean | undefined;
  error: OptionType | string | undefined;
}

export const BtgError = memo(function ({
  touched,
  error,
  ...props
}: BtgErrorProps) {
  if (error) console.log('in error', error);

  let errorValue: ReactNode;

  if (typeof error === 'string') errorValue = error;
  if (typeof error === 'object')
    errorValue = (
      <>
        {`${error.label}`}
        {`${error.value}`}
      </>
    );
  return (
    <div className={styles['inputError']}>
      {touched && error && (
        <span {...props} className={styles['error']} style={props.style}>
          {errorValue}
        </span>
      )}
    </div>
  );
});

export default BtgError;
