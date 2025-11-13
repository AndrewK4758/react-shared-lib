import { Select } from '@base-ui-components/react/select';
import { getIn, type FormikProps } from 'formik';
import { Fragment, memo, useCallback, type ReactElement } from 'react';
import type { BtgDropDownStyles } from '../types/types';
import styles from './btg_dropdown.module.css';
import BtgError from './error/error';

export interface OptionType {
  label: string;
  value: number;
}

interface BtgDropDownProps<T, M extends boolean | undefined>
  extends Select.Root.Props<string | number, M> {
  name: Extract<keyof T, string>;
  label: string;
  formik: FormikProps<T>;
  items: OptionType[];
  StyleOverrides?: BtgDropDownStyles;
}

export const BtgDropdown = memo(function <T, M extends boolean | undefined>({
  name,
  label,
  formik,
  items,
  StyleOverrides,
  ...props
}: BtgDropDownProps<T, M>) {
  const value = getIn(formik.values, name);
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);

  const itemArray = Array.isArray(items) ? items : [];

  const passedOnChange = props.onValueChange;

  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (value: any, event: Select.Root.ChangeEventDetails) => {
      console.log(value, event);

      await formik.setFieldValue(name, value);

      passedOnChange && passedOnChange(value, event);
    },
    [formik, name, passedOnChange],
  );

  return (
    <div className={styles['wrapper']} style={StyleOverrides?.Wrapper}>
      <label
        htmlFor={name}
        className={styles['label']}
        style={StyleOverrides?.Label}
      >
        {label}
      </label>
      <Select.Root
        {...props}
        name={name}
        value={value}
        items={items}
        onValueChange={handleChange}
      >
        <Select.Trigger
          className={styles['select']}
          style={StyleOverrides?.Trigger}
        >
          <Select.Value />
          <Select.Icon className={styles['selectIcon']}>
            <ChevronUpDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner className={styles['positioner']} sideOffset={8}>
            <Select.Popup className={styles['popup']}>
              <Select.ScrollUpArrow className={styles['scrollArrow']} />
              <Select.List
                className={styles['list']}
                style={StyleOverrides?.List}
              >
                {itemArray.map((e) => (
                  <Fragment key={e.label}>
                    <Select.Item
                      className={styles['item']}
                      style={StyleOverrides?.ItemText}
                      value={e.value}
                    >
                      <Select.ItemIndicator className={styles['itemIndicator']}>
                        <CheckIcon className={styles['itemIndicatorIcon']} />
                      </Select.ItemIndicator>
                      <Select.ItemText
                        className={styles['itemText']}
                        style={StyleOverrides?.ItemText}
                      >
                        {e.label}
                      </Select.ItemText>
                    </Select.Item>
                    <Select.Separator
                      style={{ borderBottom: '1px solid #101010' }}
                    />
                  </Fragment>
                ))}
              </Select.List>
              <Select.ScrollDownArrow className={styles['scrollArrow']} />
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
        <BtgError touched={touched} error={error} />
      </Select.Root>
    </div>
  );
});

BtgDropdown.displayName = 'BtgDropDown';

export default BtgDropdown as <T, M extends boolean>(
  props: BtgDropDownProps<T, M>,
) => ReactElement<T>;

function ChevronUpDownIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M0.5 4.5L4 1.5L7.5 4.5" />
      <path d="M0.5 7.5L4 10.5L7.5 7.5" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<'svg'>) {
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
