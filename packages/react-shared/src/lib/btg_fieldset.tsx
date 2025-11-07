import { Fieldset } from '@base-ui-components/react/fieldset';
import type { HTMLAttributes, ReactElement } from 'react';
import styles from './btg_fieldset.module.css';

interface BtgFieldsetProps<T> extends HTMLAttributes<HTMLInputElement> {
  fieldLabel: string;
  //Can explicitly pass in or just use the default react children property
  //I am choosing to explicity pass the element in
  InputElement: ReactElement<T> | ReactElement<T>[];
}

export function BtgFieldset<T>({
  fieldLabel,
  InputElement,
  ...props
}: BtgFieldsetProps<T>) {
  return (
    <div className={styles['wrapper']}>
      <Fieldset.Root className={styles['fieldsetRoot']} style={props.style}>
        <Fieldset.Legend
          className={styles['fieldsetLegend']}
          style={{ color: props.style?.color }}
        >
          {fieldLabel}
        </Fieldset.Legend>
        {InputElement}
      </Fieldset.Root>
    </div>
  );
}

export default BtgFieldset;
