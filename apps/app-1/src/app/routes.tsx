import { Outlet, type RouteObject } from 'react-router';
// import formStructure from '../assets/form_structure.json';
import type { FormStructure } from '@btg/shared-ui';
import styles from './app.module.css';
import App from './app';

/**
 *
 * Add more types and properties to the type/objejct combo
 */

export type FormikFormProps = {
  newSection: {
    one: string;
    two: string;
    three: string;
  };
  person: {
    id: string;
    name: string;
    nickname: string;
    favoriteColor: { label: string; value: number };
    family: {
      mom: string;
      dad: string;
      bro: string;
      sis: string;
    };
  };
  place: {
    address: string;
    city: string;
    state: { label: string; value: number };
    zip: string;
    car: {
      make: { label: string; value: number };
      model: { label: string; value: number };
      type: string;
    };
  };
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
        loader: async () => {
          const pretendData = fetch('http://localhost:4201/practices').then(
            (resp) => resp.json(),
          ) as Promise<FormikFormProps[]>;
          const formStructure = fetch(
            'http://localhost:4201/form-structure',
          ).then((resp) => resp.json()) as Promise<FormStructure>;
          console.log(await formStructure);
          const selectValues = {
            favoriteColor: [
              { label: 'Red', value: 0 },
              { label: 'Blue', value: 1 },
              { label: 'Yellow', value: 2 },
            ],
            state: stateAbbreviations,
            make: [
              { label: 'Ford', value: 0 },
              { label: 'GMC', value: 1 },
              { label: 'Jeep', value: 2 },
            ],
            model: [
              { label: 'F-150', value: 0 },
              { label: 'Bronco', value: 1 },

              { label: 'Sierra', value: 0 },
              { label: 'Yukon', value: 1 },

              { label: 'Wrangler', value: 0 },
              { label: 'Cherokee', value: 1 },
            ],
          };

          return Promise.all([pretendData, formStructure, selectValues]);
        },
      },
    ],
  },
] as RouteObject[];

export type StateAbbreviation = (typeof stateAbbreviations)[number];
export const stateAbbreviations = [
  { label: 'AL', value: 0 },
  { label: 'AK', value: 1 },
  { label: 'AZ', value: 2 },
  { label: 'AR', value: 3 },
  { label: 'CA', value: 4 },
  { label: 'CO', value: 5 },
  { label: 'CT', value: 6 },
  { label: 'DE', value: 7 },
  { label: 'FL', value: 8 },
  { label: 'GA', value: 9 },
  { label: 'HI', value: 10 },
  { label: 'ID', value: 11 },
  { label: 'IL', value: 12 },
  { label: 'IN', value: 13 },
  { label: 'IA', value: 14 },
  { label: 'KS', value: 15 },
  { label: 'KY', value: 16 },
  { label: 'LA', value: 17 },
  { label: 'ME', value: 18 },
  { label: 'MD', value: 19 },
  { label: 'MA', value: 20 },
  { label: 'MI', value: 21 },
  { label: 'MN', value: 22 },
  { label: 'MS', value: 23 },
  { label: 'MO', value: 24 },
  { label: 'MT', value: 25 },
  { label: 'NE', value: 26 },
  { label: 'NV', value: 27 },
  { label: 'NH', value: 28 },
  { label: 'NJ', value: 29 },
  { label: 'NM', value: 30 },
  { label: 'NY', value: 31 },
  { label: 'NC', value: 32 },
  { label: 'ND', value: 33 },
  { label: 'OH', value: 34 },
  { label: 'OK', value: 35 },
  { label: 'OR', value: 36 },
  { label: 'PA', value: 37 },
  { label: 'RI', value: 38 },
  { label: 'SC', value: 39 },
  { label: 'SD', value: 40 },
  { label: 'TN', value: 41 },
  { label: 'TX', value: 42 },
  { label: 'UT', value: 43 },
  { label: 'VT', value: 44 },
  { label: 'VA', value: 45 },
  { label: 'WA', value: 46 },
  { label: 'WV', value: 47 },
  { label: 'WI', value: 48 },
  { label: 'WY', value: 49 },
];
