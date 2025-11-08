import type { FieldNode, SectionNode } from './btg_form_tree_traversal';

export function formatFieldNode(node: FieldNode): string {
  return `${node.name[0].toUpperCase()}${node.name.slice(1)}`;
}

export function formatSectionNode(node: SectionNode): string {
  return `${node.label[0].toUpperCase()}${node.label.slice(1)}`;
}
