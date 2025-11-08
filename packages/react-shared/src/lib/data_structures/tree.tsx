import type { FormikProps } from 'formik';
import type { BtgRenderTreeStyles } from '../../types/types';
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
  StyleOverrides?: BtgRenderTreeStyles;
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
  StyleOverrides,
}: RecursiveFormProps<T>) {
  const Tree = nodes.map((node) => {
    switch (node.type) {
      case NodeType.Section: {
        const sectionLabel = formatSectionNode(node);
        const currentPath = path ? `${path}.${node.label}` : node.label;

        return (
          <BtgFieldset<T>
            key={sectionLabel}
            fieldLabel={sectionLabel}
            StyleOverrides={StyleOverrides?.Fieldset}
            InputElement={
              <BtgRenderTree
                nodes={node.children}
                formik={formik}
                path={currentPath}
                StyleOverrides={StyleOverrides}
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
            name={fieldName as Extract<keyof T, string>}
            formik={formik}
            StyleOverrides={StyleOverrides?.Input}
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
