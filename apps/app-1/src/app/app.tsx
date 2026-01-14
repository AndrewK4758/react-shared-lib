import {
  apiClient,
  type ApiPractice,
  BtgFieldset,
  BtgRenderTree,
  type FormStructure,
  type OptionType,
  transformObjectToFormTree,
} from '@btg/shared-ui';
import '@btg/shared-ui/styles';
import { FormikProvider, useFormik } from 'formik';
import { type FormEvent, useMemo } from 'react';
import { useRouteLoaderData } from 'react-router';
import styles from './app.module.css';
import type { FormikFormProps } from './routes';
import * as Yup from 'yup';

/**
 * Transform form values (with dropdown objects) to API format (with string values)
 */
function transformFormToApi(values: FormikFormProps): ApiPractice {
  return {
    person: {
      id: values.person.id,
      name: values.person.name,
      nickname: values.person.nickname,
      favoriteColor: values.person.favoriteColor.label,
      family: values.person.family,
    },
    place: {
      address: values.place.address,
      city: values.place.city,
      state: values.place.state.label,
      zip: values.place.zip,
      car: {
        make: values.place.car.make.label,
        model: values.place.car.model.label,
      },
    },
  };
}

export interface SelectValuesType {
  [key: string]: OptionType[];
}

const initialValues: FormikFormProps = {
  newSection: {
    one: '',
    two: '',
    three: '',
  },
  person: {
    name: '',
    id: '',
    favoriteColor: { label: '', value: -1 },
    nickname: '',
    family: { bro: '', sis: '', mom: '', dad: '' },
  },
  place: {
    address: '',
    car: {
      make: { label: '', value: -1 },
      model: { label: '', value: -1 },
      type: '',
    },
    city: '',
    state: { label: '', value: -1 },
    zip: '',
  },
};

const validationSchema: Yup.ObjectSchema<Yup.AnyObject, FormikFormProps> =
  Yup.object<FormikFormProps>({
    newSection: Yup.object({
      one: Yup.string().required().min(2),
      two: Yup.string().required().min(2),
      three: Yup.string().required().min(2),
    }),
    person: Yup.object({
      name: Yup.string().required().min(2),
      id: Yup.string().required().min(2),
      favoriteColor: Yup.object<OptionType>({
        label: Yup.string().required().min(2),
        value: Yup.number().required().min(0),
      }).required(),
      nickname: Yup.string().required().min(2),
      family: Yup.object({
        bro: Yup.string().required().min(2),
        sis: Yup.string().required().min(2),
        mom: Yup.string().required().min(2),
        dad: Yup.string().required().min(2),
      }),
    }),
    place: Yup.object({
      address: Yup.string().required().min(2),
      car: Yup.object({
        make: Yup.object<OptionType>({
          label: Yup.string().required().min(2),
          value: Yup.number().required().min(0),
        }).required(),
        model: Yup.object<OptionType>({
          label: Yup.string().required().min(2),
          value: Yup.number().required().min(0),
        }).required(),
        type: Yup.string().required().min(2),
      }),
      city: Yup.string().required().min(2),
      state: Yup.object<OptionType>({
        label: Yup.string().required().min(2),
        value: Yup.number().required().min(0),
      }).required(),
      zip: Yup.string().required().min(2),
    }),
  });

export function App() {
  const [_, structure, dropdown] = useRouteLoaderData('app') as [
    ApiPractice[],
    FormStructure,
    SelectValuesType,
  ];
  const formik = useFormik<FormikFormProps>({
    initialValues: initialValues,
    onSubmit: async (values) => {
      // Transform form values to API format before sending
      const apiPayload = transformFormToApi(values);
      await apiClient.post<ApiPractice>('/practices', apiPayload);
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: validationSchema,
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
                    color: 'azure',
                  },
                },
                Input: {
                  Root: {
                    maxHeight: 'fit-content',
                    backgroundColor: 'Background',
                  },
                  Label: { color: '#242424' },
                  Control: {
                    borderColor: 'ActiveBorder',
                  },
                },
                Dropdown: {
                  Root: { backgroundColor: 'Background' },
                  Trigger: { border: '1px solid azure' },
                  Label: {},
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
