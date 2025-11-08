import {
  BtgFieldset,
  BtgRenderTree,
  transformObjectToFormTree,
} from '@btg/shared-ui';
import '@btg/shared-ui/styles';
import { FormikProvider, useFormik } from 'formik';
import { useMemo, type FocusEvent, type FormEvent } from 'react';
import styles from './app.module.css';

/**
 *
 * Add more types and properties to the type/objejct combo
 */
type FormikFormProps = {
  person: {
    id: string;
    name: string;
    nickname: string;
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

const initialValues: FormikFormProps = {
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

// STYLES ARE FAIRLY STATIC GRID, WAS MORE FOCUSED ON THE FORM SINCE THAT IS WHAT WE USE THE MOST, WE CAN USE THE BTG RENDER TREE AS A BASE FUNCTION AND ACCORDING TO TYPES OR NEEDS SWAP OUT THE FUNCTIONS NECESSARY

//THIS IS WHAT I MEAN BY REUSEABLE AND EXTENSIBLE COMPONENTS. CHANGE THE COLOR IN THE APP AND EVERYTHING ELSE CHANGES, OR CHANGE THE STYLE OR PROP IN THE LIBRARY AND EVERY APP CHANGES

export function App() {
  const formik = useFormik<FormikFormProps>({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  //Handled globally to the app level component
  // eslint-disable-next-line react-hooks/immutability
  formik.handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    console.log('blur', event.currentTarget.name);
  };

  //Import the model from db and render the objects according to what is added to db.
  //The data controls the ui, we just set up the environment for it to exist and communicate
  const formTree = useMemo(() => transformObjectToFormTree(initialValues), []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit(event.currentTarget.values);
  };

  return (
    <div
      style={{
        backgroundColor: '#101010',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <FormikProvider value={formik}>
        <form
          action={undefined}
          onSubmit={handleSubmit}
          onReset={() => formik.resetForm()}
          encType="application/json"
          style={{
            border: '2px solid brown',
            height: '100%',
            paddingBlock: '3rem 0',
            paddingInline: '5rem',
          }}
        >
          <div className={styles['appStyles']}>
            <BtgRenderTree<FormikFormProps>
              nodes={formTree}
              formik={formik}
              formStyles={{ color: 'azure', borderColor: 'azure' }}
            />
            <BtgFieldset
              fieldLabel="Actions"
              style={{ color: 'azure', borderColor: 'azure' }}
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
