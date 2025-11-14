import {
  BtgFieldset,
  BtgRenderTree,
  transformObjectToFormTree,
  type FormStructure,
  type OptionType,
} from '@btg/shared-ui';
import '@btg/shared-ui/styles';
import { FormikProvider, useFormik } from 'formik';
import { useMemo, type FormEvent } from 'react';
import { useRouteLoaderData } from 'react-router';
import styles from './app.module.css';
import type { FormikFormProps } from './routes';

// 2. Define the main type for the selectValues object
export interface SelectValuesType {
  [key: string]: OptionType[];
}

type ComponentStructure = {
  values: FormikFormProps;
  structure: FormStructure;
  dropdown: SelectValuesType;
};

// WAS MORE FOCUSED ON THE FORM SINCE THAT IS WHAT WE USE THE MOST, WE CAN USE THE BTG RENDER TREE AS A BASE FUNCTION AND ACCORDING TO TYPES OR NEEDS SWAP OUT THE FUNCTIONS NECESSARY

//THIS IS WHAT I MEAN BY REUSEABLE AND EXTENSIBLE COMPONENTS. CHANGE THE COLOR IN THE APP AND EVERYTHING ELSE CHANGES, OR CHANGE THE STYLE OR PROP IN THE LIBRARY AND EVERY APP CHANGES

const initialValues: FormikFormProps = {
  person: {
    name: '',
    id: '',
    favoriteColor: '',
    nickname: '',
    family: { bro: '', sis: '', mom: '', dad: '' },
  },
  place: {
    address: '',
    car: { make: '', model: '' },
    city: '',
    state: '',
    zip: '',
  },
};

export function App() {
  const [values, structure, dropdown] = useRouteLoaderData('app') as [
    FormikFormProps[],
    FormStructure,
    SelectValuesType,
  ];
  const formik = useFormik<FormikFormProps>({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const options: RequestInit = {
        body: JSON.stringify(values),
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const postResp = await fetch('http://localhost:4201/practices', options);

      console.log(await postResp.json());
    },
  });

  //Import the model from db and render the objects according to what is added to db.
  //The data controls the ui, we just set up the environment for it to exist and communicate
  const formTree = useMemo(
    () => transformObjectToFormTree<FormStructure>(structure),
    [structure],
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
        width: '100%',
      }}
    >
      <FormikProvider value={formik}>
        <form
          className={styles['form']}
          action={undefined}
          onSubmit={handleSubmit}
          onReset={() => formik.resetForm()}
          encType="application/json"
        >
          <div className={styles['appStyles']}>
            <BtgRenderTree<FormikFormProps>
              nodes={formTree}
              formik={formik}
              selectOptions={dropdown}
              StyleOverrides={{
                Fieldset: {
                  Root: {
                    borderColor: 'azure',
                    flex: '0 1 46%',
                    maxHeight: 'fit-content',
                  },
                  Legend: {
                    color: 'red',
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
                Dropdown: {
                  Trigger: { border: '1px solid azure' },
                  Label: { color: 'GrayText' },
                  List: {
                    borderColor: 'azure',
                    borderRadius: '12px',
                  },
                  ItemText: {
                    fontSize: '1rem',
                    fontFamily: 'monospace',
                  },
                },
              }}
            />
          </div>
          <BtgFieldset
            fieldLabel="Actions"
            StyleOverrides={{
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
        </form>
      </FormikProvider>
    </div>
  );
}

export default App;
