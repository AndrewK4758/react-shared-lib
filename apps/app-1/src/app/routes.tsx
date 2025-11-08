import type { RouteObject } from 'react-router';
import App, { FormikFormProps } from './app';

export default [
  {
    path: '/',
    id: 'app',
    errorElement: <>Opps Error!!</>,
    hydrateFallbackElement: (
      <div
        style={{
          backgroundColor: '#101010',
          minHeight: '100vh',
          color: 'azure',
          padding: '3rem',
        }}
      >
        Hydrate Fallback / Loading...
      </div>
    ),
    element: <App />,
    loader: () => {
      const pretendData: FormikFormProps = {
        person: {
          id: '',
          name: '',
          nickname: '',
        },
        place: {
          address: '',
          city: '',
          state: '',
          zip: '',
          car: {
            make: '',
            model: '',
          },
        },
      };

      return new Promise((res) => {
        setTimeout(() => res(pretendData), 1500);
      });
    },
  },
] as RouteObject[];
