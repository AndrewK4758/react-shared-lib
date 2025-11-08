import type { CSSProperties } from 'react';

export type BtgCommonStyles<Slots extends string> = {
  [Slot in Slots]?: CSSProperties;
};

export type BtgFieldsetStyles = BtgCommonStyles<'Root' | 'Legend'>;

export type BtgInputStyles = BtgCommonStyles<
  'Root' | 'Label' | 'Control' | 'Error'
>;

export type BtgRenderTreeStyles = {
  Fieldset: BtgFieldsetStyles;
  Input: BtgInputStyles;
};
