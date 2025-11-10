import { Field } from '@base-ui-components/react';
import type { FormikProps } from 'formik/dist/types';
import {
  forwardRef,
  memo,
  useCallback,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type FocusEvent,
  type ReactElement,
  type Ref,
} from 'react';
import type { BtgInputStyles } from '../types/types';
import styles from './btg_input.module.css';
import BtgError from './error/error';
console.log(styles);
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

    const { value, onBlur, onChange } =
      formik.getFieldProps<Extract<T[keyof T], string>>(name);

    const touched = formik.touched[name] as boolean;
    const error = formik.errors[name] as string;

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        passedOnChange && passedOnChange(event);
      },
      [onChange, passedOnChange],
    );

    const handleBlur = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        onBlur(event);
        passedOnBlur && passedOnBlur(event);
        console.log('blur for: ', event.currentTarget.name);
      },
      [onBlur, passedOnBlur],
    );

    return (
      <Field.Root className={styles['inputRoot']} style={StyleOverrides?.Root}>
        <Field.Label
          htmlFor={`${name}-input-id`}
          className={styles['inputLabel']}
          style={StyleOverrides?.Label}
        >
          {label}
        </Field.Label>
        <Field.Control
          className={styles['inputControl']}
          ref={ref}
          {...props}
          id={`${name}-input-id`}
          name={name}
          value={value ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          style={StyleOverrides?.Control}
        />

        <BtgError
          touched={touched}
          error={error}
          style={StyleOverrides?.Error}
        />
      </Field.Root>
    );
  }),
);

export const BtgInput = BtgInputImplementation as unknown as <T>(
  props: BtgInputProps<T> & { ref?: Ref<HTMLInputElement> },
) => ReactElement<T>;

export default BtgInput;
