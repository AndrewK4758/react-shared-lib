export type FormNode = FieldNode | SectionNode;

export type FieldNode = {
  type: 'field';
  name: string;
  fieldType: 'text' | 'dropdown';
  fieldId: number;
};

export type SectionNode = {
  type: 'section';
  label: string;
  children: FormNode[];
};

export type FormField = { type: 'text' | 'dropdown'; id: number };

export type FormStructure = {
  [key: string]: FormField | FormStructure;
};

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
        'id' in value &&
        (value.type === 'text' || value.type === 'dropdown')
      ) {
        const field = value as FormField;
        return {
          type: 'field',
          name: key,
          fieldType: field.type,
          fieldId: field.id,
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
