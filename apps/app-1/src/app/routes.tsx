import { Outlet, type RouteObject } from 'react-router';
// import formStructure from '../assets/form_structure.json';
import App, { type FormikFormProps } from './app';
import styles from './app.module.css';

const formStructure = {
  person: {
    id: { type: 'text', id: 1 },
    name: { type: 'text', id: 1 },
    nickname: { type: 'text', id: 1 },
    parents: {
      mom: { type: 'text', id: 1 },
      dad: { type: 'text', id: 1 },
    },
  },
  place: {
    address: { type: 'text', id: 1 },
    city: { type: 'text', id: 1 },
    state: { type: 'dropdown', id: 2 },
    zip: { type: 'text', id: 1 },
    car: {
      make: { type: 'dropdown', id: 2 },
      model: { type: 'dropdown', id: 2 },
    },
  },
};

export default [
  {
    path: '/',
    errorElement: <>Opps Error!!</>,
    element: (
      <div
        style={{
          backgroundColor: '#101010',
          minHeight: '100vh',
          color: 'azure',
          padding: '3rem',
          border: '5px solid azure',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3rem',
        }}
      >
        <h1>LAYOUT ELEMENT</h1>
        <Outlet />
      </div>
    ),
    children: [
      {
        hydrateFallbackElement: (
          <div className={styles['loading-dots']}>
            <span className={styles['dot']} />
            <span className={styles['dot']} />
            <span className={styles['dot']} />
          </div>
        ),
        id: 'app',
        index: true,
        element: <App />,
        loader: () => {
          const pretendData: FormikFormProps = {
            person: {
              id: '',
              name: '',
              nickname: '',
              parents: {
                mom: '',
                dad: '',
              },
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
            setTimeout(
              () => res({ values: pretendData, structure: formStructure }),
              1500,
            );
          });
        },
      },
    ],
  },
] as RouteObject[];
