import type { FormikProps } from 'formik';
import type { CSSProperties } from 'react';
import type { FormNode } from '../../utils/btg_form_tree_traversal';
import BtgFieldset from '../btg_fieldset';
import BtgInput from '../btg_input';
// import styles from './tree.module.css';

interface RecursiveFormProps<T> {
  nodes: FormNode[];
  formik: FormikProps<T>;
  path?: string;
  formStyles?: CSSProperties;
}

/**
 *
 * Renders a Javascript object into form state for dynamic forms
 *
 */

export function BtgRenderTree<T extends object>({
  nodes,
  formik,
  path = '',
  formStyles,
}: RecursiveFormProps<T>) {
  const Tree = nodes.map((node) => {
    console.log(node);
    if (node.type === 'section') {
      const sectionLabel = `${node.label[0].toUpperCase()}${node.label.slice(1)}`;

      const currentPath = path ? `${path}.${node.label}` : node.label;

      return (
        <BtgFieldset
          key={sectionLabel}
          fieldLabel={sectionLabel}
          style={formStyles}
          InputElement={
            <BtgRenderTree
              nodes={node.children}
              formik={formik}
              path={currentPath}
              formStyles={formStyles}
            />
          }
        ></BtgFieldset>
      );
    }

    if (node.type === 'field') {
      const fieldName = path ? `${path}.${node.name}` : node.name;

      const fieldLabel = `${node.name[0].toUpperCase()}${node.name.slice(1)}`;

      return (
        <BtgInput<T>
          key={fieldName}
          label={fieldLabel}
          formKey={fieldName as Extract<keyof T, string>}
          formik={formik}
          style={formStyles}
        />
      );
    }

    return null;
  });

  return Tree;
}

export default BtgRenderTree;
