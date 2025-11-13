import type { FieldNode, SectionNode } from '../types/types';

export function formatFieldNode(node: FieldNode): string {
  const name = parseTableStringIntoLabel(node.name);

  return `${name[0].toUpperCase()}${name.slice(1)}`;
}

export function formatSectionNode(node: SectionNode): string {
  return `${node.label[0].toUpperCase()}${node.label.slice(1)}`;
}

function parseTableStringIntoLabel(tableField: string): string {
  const isUppercase = /[A-Z]/.test(tableField);
  if (isUppercase) {
    const tableFieldArray = tableField.split('');

    const loopLength = tableFieldArray.length;
    for (let i = 0; i < loopLength; i++) {
      if (tableFieldArray[i] === tableFieldArray[i].toUpperCase()) {
        tableFieldArray.splice(i, 0, ' ');
        i += 1;
      }
    }
    tableField = tableFieldArray.join('');
  }

  return tableField;
}
