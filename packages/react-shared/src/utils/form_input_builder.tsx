import BtgDropdown from '../lib/btg_dropdown';
import BtgInput from '../lib/btg_input';
import type { BaseFormProps, FieldNode } from '../types/types';
// import styles from './form_input_builder.module.css';
import { formatFieldNode } from './format_nodes_to_labels';

interface FormInputBuilderProps<T> extends BaseFormProps<T> {
  node: FieldNode;
}

export function FormInputBuilder<T>({
  node,
  path,
  formik,
  selectOptions,
  StyleOverrides,
  ...props
}: FormInputBuilderProps<T>) {
  switch (node.fieldType) {
    case 'text': {
      const fieldName = path ? `${path}.${node.name}` : node.name;
      const fieldLabel = formatFieldNode(node);

      return (
        <BtgInput<T>
          {...props}
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
      const fieldData = selectOptions[node.name];

      return (
        <BtgDropdown<T>
          {...props}
          key={`${fieldName}-${fieldLabel}`}
          label={fieldLabel}
          name={fieldName as Extract<keyof T, string>}
          formik={formik}
          items={fieldData}
          StyleOverrides={StyleOverrides?.Dropdown}
        />
      );
    }
    default:
      return null;
  }
}

export default FormInputBuilder;
