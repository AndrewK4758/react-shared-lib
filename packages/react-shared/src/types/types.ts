import type { FormikProps } from 'formik/dist/types';
import type { CSSProperties } from 'react';

export type BtgCommonStyles<Slots extends string> = {
  [Slot in Slots]?: CSSProperties;
};

export type BtgFieldsetStyles = BtgCommonStyles<'Root' | 'Legend'>;

export type BtgInputStyles = BtgCommonStyles<
  'Root' | 'Label' | 'Control' | 'Error'
>;

export type BtgDropDownStyles = BtgCommonStyles<
  | 'Wrapper'
  | 'Trigger'
  | 'Root'
  | 'Label'
  | 'GroupLabel'
  | 'Group'
  | 'List'
  | 'ItemText'
>;

export interface OptionType {
  label: string;
  value: number;
}

export type BtgRenderTreeStyles = {
  Fieldset?: BtgFieldsetStyles;
  Input?: BtgInputStyles;
  Dropdown?: BtgDropDownStyles;
};

export type OptionTypes = {
  [key: string]: OptionType[];
};

export interface BaseFormProps<T> {
  formik: FormikProps<T>;
  path?: string;
  selectOptions: OptionTypes;
  StyleOverrides?: BtgRenderTreeStyles;
}

export type FieldNode = {
  type: typeof NodeType.Field;
  name: string;
  fieldType: 'text' | 'dropdown';
  fieldId: number;
};

export type SectionNode = {
  type: typeof NodeType.Section;
  label: string;
  children: FormNode[];
};

interface NodeTypeSelector {
  Section: 'section';
  Field: 'field';
}

export const NodeType: NodeTypeSelector = Object.freeze({
  Section: 'section',
  Field: 'field',
} as const);

export type FormField = { type: 'text' | 'dropdown'; id: number };

export type FormStructure = {
  [key: string]: FormField | FormStructure;
};

export type FormNode = FieldNode | SectionNode;
