import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(
      getAllByText(new RegExp('Welcome app-1', 'gi')).length > 0,
    ).toBeTruthy();
  });
});
