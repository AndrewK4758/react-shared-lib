import type { FormikProps } from 'formik';
import BtgDropDown from '../lib/btg_dropdown';
import BtgInput from '../lib/btg_input';
import type { BtgRenderTreeStyles } from '../types/types';
import type { FieldNode } from './btg_form_tree_traversal';
// import styles from './form_input_builder.module.css';
import { formatFieldNode } from './format_nodes_to_labels';

interface FormInputBuilderProps<T> {
  node: FieldNode;
  path: string;
  formik: FormikProps<T>;
  StyleOverrides?: BtgRenderTreeStyles;
}

export function FormInputBuilder<T>({
  node,
  path,
  formik,
  StyleOverrides,
}: FormInputBuilderProps<T>) {
  console.log(node);
  switch (node.fieldType) {
    case 'text': {
      const fieldName = path ? `${path}.${node.name}` : node.name;
      const fieldLabel = formatFieldNode(node);
      return (
        <BtgInput<T>
          key={fieldName}
          label={fieldLabel}
          name={fieldName as Extract<keyof T, string>}
          formik={formik}
          StyleOverrides={StyleOverrides?.Input}
        />
      );
    }
    case 'dropdown': {
      const fieldName = path ? `${path}.${node.name}` : node.name;
      const fieldLabel = formatFieldNode(node);
      return (
        <BtgDropDown<T>
          key={fieldName}
          label={fieldLabel}
          name={fieldName as Extract<keyof T, string>}
          formik={formik}
          StyleOverrides={StyleOverrides?.Dropdown}
        />
      );
    }
    default:
      return null;
  }
}

export default FormInputBuilder;
