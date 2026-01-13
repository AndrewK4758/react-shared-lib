import { render } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Routes from './routes';

const router = createBrowserRouter(Routes);

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RouterProvider router={router} />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getAllByText } = render(<RouterProvider router={router} />);
    expect(
      getAllByText(new RegExp('LAYOUT ELEMENT', 'i')).length > 0,
    ).toBeTruthy();
  });
});
