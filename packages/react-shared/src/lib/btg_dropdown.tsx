import { type FormikProps, getIn } from 'formik';
import type { ComponentProps, FocusEvent } from 'react';
import { memo, type ReactElement, useCallback } from 'react';
import type {
  BtgDropDownStyles,
  OptionType,
  Path,
  PathValue,
} from '../types/types';
import styles from './btg_dropdown.module.css';
import { Combobox } from '@base-ui-components/react/combobox';
import { Field } from '@base-ui-components/react/field';
import BtgError from './error/error';

type BaseComboboxRawProps = ComponentProps<typeof Combobox.Root>;

interface BtgDropDownProps<T, Name extends Path<T>>
  extends BaseComboboxRawProps {
  name: Name;
  label: string;
  formik: FormikProps<T>;
  items: OptionType[];
  StyleOverrides?: BtgDropDownStyles;
}

export const BtgDropdown = memo(function <T, Name extends Path<T>>({
  name,
  label,
  formik,
  items,
  StyleOverrides,
  ...props
}: BtgDropDownProps<T, Name>): ReactElement {
  const { value, onBlur } = formik.getFieldProps<PathValue<T, Name>>(name);

  const error: OptionType | string = getIn(formik.errors, name);
  const touched: boolean | undefined = getIn(formik.touched, name);

  const itemArray: OptionType[] = Array.isArray(items) ? items : [];
  const passedOnChange = props.onValueChange;

  const handleChange = useCallback(
    async (
      value: unknown,
      event: Combobox.Root.ChangeEventDetails,
    ): Promise<void> => {
      if (name === 'person.favoriteColor') console.log(value);
      await formik.setFieldValue(name, value as PathValue<T, Name>, true);
      passedOnChange && passedOnChange(value as PathValue<T, Name>, event);
    },
    [formik, name, passedOnChange],
  );

  const handleBlur = useCallback(
    async (event: FocusEvent<HTMLDivElement>): Promise<void> => {
      onBlur(event);
    },
    [onBlur],
  );

  return (
    <Field.Root
      name={name}
      onBlur={handleBlur}
      className={styles['fieldRoot']}
      style={StyleOverrides?.Root}
    >
      <Combobox.Root
        {...props}
        items={itemArray}
        value={value}
        onValueChange={handleChange}
        autoHighlight={true}
      >
        <div className={styles['inputRoot']}>
          <Combobox.Input
            id={name}
            name={name}
            className={styles['inputControl']}
            placeholder={' '}
          />
          <Field.Label
            className={styles['inputLabel']}
            style={StyleOverrides?.Label}
            htmlFor={name}
          >
            {label}
          </Field.Label>
          <div className={styles['inputActions']}>
            <Combobox.Clear
              className={styles['Clear']}
              aria-label="Clear selection"
            >
              <span className="material-symbols-outlined">close</span>
            </Combobox.Clear>
            <Combobox.Trigger
              className={styles['Trigger']}
              aria-label="Open popup"
            >
              <span className="material-symbols-outlined">expand_content</span>
            </Combobox.Trigger>
          </div>
        </div>
        <Combobox.Portal>
          <Combobox.Positioner className={styles['Positioner']} sideOffset={4}>
            <Combobox.Popup className={styles['Popup']}>
              <Combobox.Empty className={styles['Empty']}>
                {`${label} is empty`}
              </Combobox.Empty>
              <Combobox.List className={styles['List']}>
                {(item: OptionType): ReactElement => (
                  <Combobox.Item
                    key={item.value}
                    value={item}
                    className={styles['Item']}
                  >
                    <Combobox.ItemIndicator
                      className={styles['ItemIndicator']}
                      keepMounted={item === value}
                    >
                      <span className="material-symbols-outlined">check</span>
                    </Combobox.ItemIndicator>

                    <div className={styles['ItemText']}>{item.label}</div>
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
      <Field.Error match={true} className={styles['fieldError']}>
        <BtgError touched={touched} error={error} />
      </Field.Error>
    </Field.Root>
  );
});

BtgDropdown.displayName = 'BtgDropDown';

export default BtgDropdown as unknown as <T, Name extends Path<T>>(
  props: BtgDropDownProps<T, Name>,
) => ReactElement<T, Name>;
