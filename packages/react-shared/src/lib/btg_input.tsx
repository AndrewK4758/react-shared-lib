import { Field } from '@base-ui-components/react/field';
import type { FormikProps } from 'formik/dist/types';
import {
  type ChangeEvent,
  type ComponentPropsWithRef,
  type FocusEvent,
  forwardRef,
  memo,
  type ReactElement,
  type Ref,
  useCallback,
} from 'react';
import type { BtgInputStyles } from '../types/types';
import styles from './btg_input.module.css';
import BtgError from './error/error';
import { getIn } from 'formik';

interface BtgInputProps<T>
  extends ComponentPropsWithRef<Exclude<'input', 'style'>> {
  label: string;
  name: Extract<keyof T, string>;
  formik: FormikProps<T>;
  StyleOverrides?: BtgInputStyles;
}

const BtgInputImplementation = memo(
  forwardRef(function <T>(
    { label, name, formik, StyleOverrides, ...props }: BtgInputProps<T>,
    ref?: Ref<HTMLInputElement> | undefined,
  ) {
    const passedOnChange = props.onChange;
    const passedOnBlur = props.onBlur;

    const { value, onChange, onBlur } = formik.getFieldProps(name);

    const touched = getIn(formik.touched, name);
    const error = getIn(formik.errors, name);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        passedOnChange && passedOnChange(event);
      },
      [onChange, passedOnChange],
    );

    const handleBlurEvent = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        onBlur(event);
        passedOnBlur && passedOnBlur(event);
        console.log('blur for: ', event.currentTarget.name);
      },
      [onBlur, passedOnBlur],
    );

    return (
      <Field.Root className={styles['inputRoot']} style={StyleOverrides?.Root}>
        <Field.Control
          {...props}
          className={styles['inputControl']}
          ref={ref}
          id={`${name}-input-id`}
          name={name}
          value={value}
          disabled={formik.isSubmitting}
          onChange={handleChange}
          onBlur={handleBlurEvent}
          style={StyleOverrides?.Control}
          required={true}
        />
        <Field.Label
          htmlFor={`${name}-input-id`}
          className={styles['inputLabel']}
          style={StyleOverrides?.Label}
        >
          {label}
        </Field.Label>
        <Field.Error match={true} className={styles['fieldError']}>
          <BtgError
            touched={touched}
            error={error}
            style={StyleOverrides?.Error}
          />
        </Field.Error>
      </Field.Root>
    );
  }),
);

export const BtgInput = BtgInputImplementation as unknown as <T>(
  props: BtgInputProps<T> & { ref?: Ref<HTMLInputElement> },
) => ReactElement<T>;

export default BtgInput;
