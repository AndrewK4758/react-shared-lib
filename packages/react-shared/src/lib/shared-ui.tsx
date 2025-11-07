import { Field, Fieldset } from '@base-ui-components/react';
import type { FormikProps } from 'formik/dist/types';
import {
  forwardRef,
  type ComponentPropsWithRef,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import './shared-ui.module.css';
import styles from './shared-ui.module.css';

interface SharedUiProps<T> extends ComponentPropsWithRef<'input'> {
  inputLabel?: ReactNode;
  fieldsetLabel?: ReactNode;
  inputName: Extract<keyof T, string>;
  formikProps: FormikProps<T>;
}

const SharedUiImplementation = forwardRef(function <T>(
  {
    fieldsetLabel,
    inputName,
    inputLabel,
    formikProps,
    ...props
  }: SharedUiProps<T>,
  ref: Ref<HTMLInputElement> | undefined,
) {
  const touched = formikProps.touched[inputName];
  const error = formikProps.touched[inputName];

  const isErrored = typeof error === 'string' && touched;

  return (
    <Fieldset.Root
      className={styles['fieldsetRoot']}
      style={
        {
          // fontSize: '1.5rem',
          // paddingBlock: '0.75rem',
          // paddingInline: '0.5rem',
          // border: '1px solid',
          // borderRadius: '12px',
          // position: 'relative',
          // ...props.style,
        }
      }
    >
      <Fieldset.Legend
        style={{
          position: 'absolute',
          top: -18,
          left: '8px',
          background: '#101010',
          color: props.style?.color,
        }}
      >
        {fieldsetLabel}
      </Fieldset.Legend>
      <Field.Root
        style={{
          display: 'block',
          paddingInline: '1rem',
          color: props.style?.color,
        }}
      >
        <Field.Label htmlFor={inputName} style={{ marginBlock: '0.5rem' }}>
          {inputLabel}
        </Field.Label>
        <Field.Control
          ref={ref}
          {...props}
          name={inputName}
          style={{
            ...props.style,
            borderRadius: '12px',
            lineHeight: '2rem',
            border: '2px solid',
            color: 'black',
            fontSize: '1.5rem',
          }}
        />
        <div
          style={{
            fontSize: 'small',
            color: 'red',
            marginInlineStart: '0.75rem',
            marginBlockStart: '0.25rem',
          }}
        >
          <p>Error Label</p>
          {isErrored ? error : null}
        </div>
      </Field.Root>
    </Fieldset.Root>
  );
});

export const SharedUi = SharedUiImplementation as unknown as <T>(
  props: SharedUiProps<T> & { ref?: Ref<HTMLInputElement> },
) => ReactElement<T>;

export default SharedUi;
