import { type HTMLAttributes, memo } from 'react';
import styles from './error.module.css';
import type { OptionType } from '../../types/types';
import formatCamelCase from '../../utils/format_camel_case';

interface BtgErrorProps extends HTMLAttributes<HTMLSpanElement> {
  touched: boolean | undefined;
  error: OptionType | string | undefined;
}

export const BtgError = memo(function ({
  touched,
  error,
  ...props
}: BtgErrorProps) {
  const errorValue = parseErrorName(error);

  return (
    <div className={styles['inputError']}>
      {touched && error && (
        <div
          {...props}
          className={styles['error']}
          style={props.style}
          aria-label={'error-field'}
          aria-errormessage={errorValue}
          aria-invalid={true}
        >
          {errorValue}
        </div>
      )}
    </div>
  );
});

export default BtgError;

function parseErrorName(
  error: OptionType | string | undefined,
): string | undefined {
  if (typeof error !== 'undefined') {
    switch (typeof error) {
      case 'string': {
        const errorArray: string[] = error.split(' ');
        const errorName: string = errorArray[0];

        const errorValueArray: string[] = errorName.split('.');
        const errorValue: string = errorValueArray[errorValueArray.length - 1];

        const formattedErrorLabel: string = formatCamelCase(errorValue);
        return errorArray.toSpliced(0, 1, formattedErrorLabel).join(' ');
      }
      case 'object': {
        const errorLabelArray: string[] = error.label.split(' ');
        const errorLabel: string = errorLabelArray[0];

        const errorValueArray: string[] = error.value.split(' ');
        const errorValue: string = errorValueArray[0];

        const errorLabelPathArray: string[] = errorLabel.split('.');
        const errorLabelString: string =
          errorLabelPathArray[errorLabelPathArray.length - 2];

        const errorValuePathArray: string[] = errorValue.split('.');
        const errorValueString: string =
          errorValuePathArray[errorValuePathArray.length - 2];

        const formattedErrorLabel: string = formatCamelCase(errorLabelString);
        const formattedErrorValue: string = formatCamelCase(errorValueString);

        const errorLabelResult: string = errorLabelArray
          .toSpliced(0, 1, formattedErrorLabel)
          .join(' ');

        const errorValueResult: string = errorValueArray
          .toSpliced(0, 1, formattedErrorValue)
          .join(' ');

        return `${errorLabelResult}. ${errorValueResult}`;
      }
    }
  }
  return undefined;
}
