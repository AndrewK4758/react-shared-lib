import type { FormikProps } from 'formik';
import type { CSSProperties } from 'react';
import type { FormNode } from '../../utils/btg_form_tree_traversal';
import {
  formatFieldNode,
  formatSectionNode,
} from '../../utils/format_nodes_to_labels';
import BtgFieldset from '../btg_fieldset';
import BtgInput from '../btg_input';
// import styles from './tree.module.css';

const NodeType = Object.freeze({
  Section: 'section',
  Field: 'field',
} as const);

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
    switch (node.type) {
      case NodeType.Section: {
        const sectionLabel = formatSectionNode(node);
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
          />
        );
      }

      case NodeType.Field: {
        const fieldName = path ? `${path}.${node.name}` : node.name;
        const fieldLabel = formatFieldNode(node);

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
      default: {
        return null;
      }
    }
  });

  return Tree;
}

export default BtgRenderTree;
