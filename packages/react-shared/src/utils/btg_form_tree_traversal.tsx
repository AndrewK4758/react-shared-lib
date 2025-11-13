import type {
  FieldNode,
  FormField,
  FormNode,
  FormStructure,
  SectionNode,
} from '../types/types';

/* Recursively transforms a state object into a tree of
 * FormNode objects for rendering.
 */
export function transformObjectToFormTree<T extends object>(
  obj: T,
): FormNode[] {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return [];
  }
  return Object.keys(obj)
    .map((key) => {
      const value = obj[key as Extract<keyof T, string>];

      if (
        typeof value === 'object' &&
        value !== null &&
        'type' in value &&
        'typeId' in value &&
        (value.type === 'text' || value.type === 'dropdown')
      ) {
        const field = value as FormField;
        return {
          type: 'field',
          name: key,
          fieldType: field.type,
          fieldId: field.typeId,
        } as FieldNode;
      } else if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        return {
          type: 'section',
          label: key,
          children: transformObjectToFormTree(value as FormStructure),
        } as SectionNode;
      }
      return null;
    })
    .filter((node: FormNode | null) => node !== null);
}

export default transformObjectToFormTree;
