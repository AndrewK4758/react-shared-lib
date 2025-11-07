import { render } from '@testing-library/react';

import type { FormikProps } from 'formik';
import SharedUi from './shared-ui';

describe('SharedUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SharedUi
        inputName={'' as never}
        formikProps={{} as FormikProps<unknown>}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
