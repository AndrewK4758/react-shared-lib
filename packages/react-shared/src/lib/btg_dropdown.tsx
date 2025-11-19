import { type FormikProps, getIn } from 'formik';
import type { ComponentProps, FocusEvent } from 'react';
import { memo, type ReactElement, useCallback } from 'react';
import type { BtgDropDownStyles, OptionType } from '../types/types';
import styles from './btg_dropdown.module.css';
import { Combobox } from '@base-ui-components/react/combobox';
import { Field } from '@base-ui-components/react/field';
import BtgError from './error/error';

type BaseComboboxRawProps = ComponentProps<typeof Combobox.Root>;

interface BtgDropDownProps<T> extends BaseComboboxRawProps {
  name: Extract<keyof T, string>;
  label: string;
  formik: FormikProps<T>;
  items: OptionType[];
  StyleOverrides?: BtgDropDownStyles;
}

export const BtgDropdown = memo(function <T>({
  name,
  label,
  formik,
  items,
  StyleOverrides,
  ...props
}: BtgDropDownProps<T>) {
  const { value, onBlur } = formik.getFieldProps(name);

  const error: string | undefined = getIn(formik.errors, name);
  const touched: boolean | undefined = getIn(formik.touched, name);

  const itemArray: OptionType[] = Array.isArray(items) ? items : [];
  const passedOnChange = props.onValueChange;

  const handleChange = useCallback(
    async (value: unknown, event: Combobox.Root.ChangeEventDetails) => {
      console.log(value, event);
      await formik.setFieldValue(name, value);
      passedOnChange && passedOnChange(value, event);
    },
    [formik, name, passedOnChange],
  );

  const handleBlur = useCallback(
    async (event: FocusEvent<HTMLDivElement>) => {
      console.log(event);

      onBlur(event);
    },
    [onBlur],
  );

  return (
    <Field.Root
      name={name}
      onBlur={handleBlur}
      className={styles['inputRoot']}
      style={StyleOverrides?.Root}
    >
      <Combobox.Root {...props} items={itemArray} onValueChange={handleChange}>
        <Combobox.Input
          id={name}
          name={name}
          className={styles['inputControl']}
          value={items.find((item) => item.value === value)?.label}
        />
        <Field.Label
          className={styles['inputLabel']}
          style={StyleOverrides?.Label}
          htmlFor={name}
        >
          {label}
        </Field.Label>
        <div className={styles.ActionButtons}>
          <Combobox.Clear className={styles.Clear} aria-label="Clear selection">
            <ClearIcon className={styles.ClearIcon} />
          </Combobox.Clear>
          <Combobox.Trigger className={styles.Trigger} aria-label="Open popup">
            <ChevronDownIcon className={styles.TriggerIcon} />
          </Combobox.Trigger>
        </div>

        <Combobox.Portal>
          <Combobox.Positioner className={styles.Positioner} sideOffset={4}>
            <Combobox.Popup className={styles.Popup}>
              <Combobox.Empty className={styles.Empty}>
                {`${label} is empty`}
              </Combobox.Empty>
              <Combobox.List className={styles.List}>
                {(item: OptionType): ReactElement => (
                  <Combobox.Item
                    key={item.value}
                    value={item.value}
                    className={styles.Item}
                  >
                    <Combobox.ItemIndicator className={styles.ItemIndicator}>
                      <CheckIcon className={styles.ItemIndicatorIcon} />
                    </Combobox.ItemIndicator>
                    <div className={styles.ItemText}>{item.label}</div>
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
      <Field.Error render={<BtgError touched={touched} error={error} />} />
    </Field.Root>
  );
});

BtgDropdown.displayName = 'BtgDropDown';

export default BtgDropdown as <T>(
  props: BtgDropDownProps<T>,
) => ReactElement<T>;

function CheckIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}

function ClearIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function ChevronDownIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
