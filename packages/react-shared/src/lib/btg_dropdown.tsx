import { Combobox } from '@base-ui-components/react/combobox';
import type { FormikProps } from 'formik';
import {
  forwardRef,
  memo,
  useCallback,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type ReactElement,
  type Ref,
} from 'react';
import type { BtgDropDownStyles } from '../types/types';
// import styles from './btg_dropdown.module.css';
import BtgError from './error/error';

interface BtgDropDownProps<T>
  extends ComponentPropsWithRef<Exclude<'select', 'style'>> {
  name: Extract<keyof T, string>;
  label: string;
  formik: FormikProps<T>;
  StyleOverrides?: BtgDropDownStyles;
}

const BtgDropDown_ = memo(
  forwardRef(function <T>(
    { name, label, formik, StyleOverrides, ...props }: BtgDropDownProps<T>,
    ref?: Ref<HTMLInputElement> | undefined,
  ) {
    const { value, onChange } = formik.getFieldProps(name);

    const passedOnChange = props.onChange;

    const touched = formik.touched[name] as boolean;
    const error = formik.errors[name] as string;

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event);
        passedOnChange && passedOnChange(event);
      },
      [onChange, passedOnChange],
    );

    return (
      // <Combobox.Root
      //   // inputRef={ref}
      //   name={name}
      //   value={value}
      //   onValueChange={handleChange}
      // >
      //   {/* <Select.GroupLabel
      //   className={styles['groupLabel']}
      //   style={StyleOverrides?.GroupLabel}
      // >
      //   {label}
      // </Select.GroupLabel> */}
      //   {/* <Select.Group className={styles['group']} style={StyleOverrides?.Group}> */}
      //   {/* <Select.List className={styles['list']} style={StyleOverrides?.List}> */}
      //   {/* <Select.ItemText */}
      //   {/* className={styles['itemList']} */}
      //   {/* style={StyleOverrides?.ItemText} */}
      //   {/* ></Select.ItemText> */}
      //   {/* <Select.ItemText */}
      //   {/* className={styles['itemList']} */}
      //   {/* style={StyleOverrides?.ItemText} */}
      //   {/* ></Select.ItemText> */}
      //   {/* </Select.List> */}
      <BtgError touched={touched} error={error} />
      // {/* // </Select.Group> */}
      // </Combobox.Root>
    );
  }),
);

BtgDropDown_.displayName = 'BtgDropDown';

export const BtgDropDown = BtgDropDown_ as unknown as <T>(
  props: BtgDropDownProps<T> & { ref?: Ref<HTMLSelectElement> },
) => ReactElement<T>;

export default BtgDropDown;
