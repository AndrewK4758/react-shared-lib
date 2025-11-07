import { Field } from '@base-ui-components/react';
import type { FormikProps } from 'formik/dist/types';
import {
  forwardRef,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type FocusEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import styles from './btg_input.module.css';

interface BtgInputProps<T> extends ComponentPropsWithRef<'input'> {
  inputLabel?: ReactNode;
  inputName: Extract<keyof T, string>;
  formikProps: FormikProps<T>;
  customClick?: (...args: unknown[]) => void;
  customBlur?: (...args: unknown[]) => void;
}

const BtgInputImplementation = forwardRef(function <T>(
  {
    inputName,
    inputLabel,
    formikProps,
    customBlur,
    customClick,
    ...props
  }: BtgInputProps<T>,
  ref: Ref<HTMLInputElement> | undefined,
) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    formikProps.setFieldValue(inputName, event.target.value, true);
    customClick && customClick();
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    formikProps.handleBlur(event);
    customBlur && customBlur();
  };

  const touched = formikProps.touched[inputName];
  const error = formikProps.touched[inputName];

  const isErrored = typeof error === 'string' && touched;

  return (
    <Field.Root className={styles['inputRoot']}>
      <Field.Label
        htmlFor={`${inputName}-input-id`}
        className={styles['inputLabel']}
        style={{ color: props.style?.color }}
      >
        {inputLabel}
      </Field.Label>
      <Field.Control
        className={styles['inputControl']}
        ref={ref}
        {...props}
        id={`${inputName}-input-id`}
        name={inputName}
        onChange={handleChange}
        onBlur={handleBlur}
        style={props.style}
      />
      <div className={styles['inputError']}>
        <p className={styles['error']}>Error Label</p>
        {isErrored ? error : null}
      </div>
    </Field.Root>
  );
});

export const BtgInput = BtgInputImplementation as unknown as <T>(
  props: BtgInputProps<T> & { ref?: Ref<HTMLInputElement> },
) => ReactElement<T>;

export default BtgInput;
