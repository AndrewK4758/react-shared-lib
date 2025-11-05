import { Field, Fieldset } from '@base-ui-components/react';
import { forwardRef, type ComponentPropsWithRef } from 'react';
import styles from './shared-ui.module.css';

type SharedUiProps = ComponentPropsWithRef<'input'>;

export const SharedUi = forwardRef<HTMLInputElement, SharedUiProps>(function (
  { ...props },
  ref
) {
  return (
    <div className={styles['container']}>
      <h2>Welcome to SharedUi!</h2>

      <Fieldset.Root>
        <Fieldset.Legend>{'ELEMENT'}</Fieldset.Legend>
        <Field.Root style={{ border: '1px solid' }}>
          <Field.Label style={{ color: 'red' }}>
            <Field.Control ref={ref} {...props} style={styles} />
          </Field.Label>
        </Field.Root>
      </Fieldset.Root>
    </div>
  );
});

export default SharedUi;
