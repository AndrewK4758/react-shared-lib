import {
  BtgFieldset,
  BtgRenderTree,
  transformObjectToFormTree,
} from '@btg/shared-ui';
import '@btg/shared-ui/styles';
import { FormikProvider, useFormik } from 'formik';
import { useMemo, type FormEvent } from 'react';
import { useRouteLoaderData } from 'react-router';
import styles from './app.module.css';

/**
 *
 * Add more types and properties to the type/objejct combo
 */
export type FormikFormProps = {
  person: {
    id: string;
    name: string;
    nickname: string;
    parents: {
      mom: string;
      dad: string;
    };
  };
  place: {
    address: string;
    city: string;
    state: string;
    zip: string;
    car: {
      make: string;
      model: string;
    };
  };
};

// STYLES ARE FAIRLY STATIC GRID, WAS MORE FOCUSED ON THE FORM SINCE THAT IS WHAT WE USE THE MOST, WE CAN USE THE BTG RENDER TREE AS A BASE FUNCTION AND ACCORDING TO TYPES OR NEEDS SWAP OUT THE FUNCTIONS NECESSARY

//THIS IS WHAT I MEAN BY REUSEABLE AND EXTENSIBLE COMPONENTS. CHANGE THE COLOR IN THE APP AND EVERYTHING ELSE CHANGES, OR CHANGE THE STYLE OR PROP IN THE LIBRARY AND EVERY APP CHANGES

export function App() {
  const initialValues = useRouteLoaderData('app');
  const formik = useFormik<FormikFormProps>({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  //Import the model from db and render the objects according to what is added to db.
  //The data controls the ui, we just set up the environment for it to exist and communicate
  const formTree = useMemo(
    () => transformObjectToFormTree<FormikFormProps>(initialValues),
    [initialValues],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit(event.currentTarget.values);
  };

  console.log(formik.values);
  return (
    <div
      style={{
        backgroundColor: '#101010',
        minHeight: '100vh',
      }}
    >
      <FormikProvider value={formik}>
        <form
          action={undefined}
          onSubmit={handleSubmit}
          onReset={() => formik.resetForm()}
          encType="application/json"
          style={{
            paddingBlock: '3rem 1rem',
            paddingInline: '5rem',
          }}
        >
          <div className={styles['appStyles']}>
            <BtgRenderTree<FormikFormProps>
              nodes={formTree}
              formik={formik}
              StyleOverrides={{
                Fieldset: {
                  Root: {
                    // display: 'flex',
                    borderColor: 'azure',
                    flex: '0 1 46%',
                    maxHeight: 'fit-content',
                  },
                  Legend: {
                    color: 'azure',
                  },
                },
                Input: {
                  Root: {
                    maxHeight: 'fit-content',
                  },
                  Label: {
                    color: 'GrayText',
                  },
                },
              }}
            />
            <BtgFieldset
              fieldLabel="Actions"
              StyleOverrides={{
                Root: { flex: '1 0 100%' },
                Legend: { color: 'azure', borderColor: 'azure' },
              }}
              InputElement={
                <div style={{ display: 'flex' }}>
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                  <div>
                    <button type="reset">Reset</button>
                  </div>
                </div>
              }
            />
          </div>
        </form>
      </FormikProvider>
    </div>
  );
}

export default App;
