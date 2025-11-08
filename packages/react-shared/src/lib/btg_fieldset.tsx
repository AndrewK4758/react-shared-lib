import { Fieldset } from '@base-ui-components/react/fieldset';
import type { HTMLAttributes, ReactElement } from 'react';
import type { BtgFieldsetStyles } from '../types/types';
import styles from './btg_fieldset.module.css';

interface BtgFieldsetProps<T>
  extends Exclude<HTMLAttributes<HTMLInputElement>, 'style'> {
  fieldLabel: string;
  //Can explicitly pass in or just use the default react children property
  //I am choosing to explicity pass the element in
  InputElement?: ReactElement<T> | ReactElement<T>[];
  StyleOverrides?: BtgFieldsetStyles;
}

export function BtgFieldset<T>({
  fieldLabel,
  InputElement,
  StyleOverrides,
  ...props
}: BtgFieldsetProps<T>) {
  return (
    <Fieldset.Root
      className={styles['fieldsetRoot']}
      style={StyleOverrides?.Root}
    >
      <Fieldset.Legend
        className={styles['fieldsetLegend']}
        style={StyleOverrides?.Legend}
      >
        {fieldLabel}
      </Fieldset.Legend>
      {InputElement}
    </Fieldset.Root>
  );
}

export default BtgFieldset;
