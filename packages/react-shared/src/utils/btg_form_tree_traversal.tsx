export type FormNode = FieldNode | SectionNode;

export type FieldNode = {
  type: 'field';
  name: string;
};

export type SectionNode = {
  type: 'section';
  label: string;
  children: FormNode[];
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

  return Object.keys(obj).map((key) => {
    const value = obj[key as Extract<keyof T, string>];

    const isNestedObject =
      typeof value === 'object' && value !== null && !Array.isArray(value);

    if (isNestedObject) {
      return {
        type: 'section',
        label: key,
        children: transformObjectToFormTree(value),
      } as SectionNode;
    } else {
      return {
        type: 'field',
        name: key,
      } as FieldNode;
    }
  });
}

export default transformObjectToFormTree;
