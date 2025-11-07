import { BtgFieldset, BtgInput } from '@btg/shared-ui';
import '@btg/shared-ui/styles';
import { useFormik } from 'formik';
import type { FocusEvent, FormEvent } from 'react';
import styles from './app.module.css';
/**
 *
 * Add more types and properties to the type/objejct combo
 */
type FormikFormProps = {
  id: string;
  name: string;
  nickname: string;
};

const initialValues: FormikFormProps = {
  id: '',
  name: '',
  nickname: '',
};

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
  const formKeys = Object.keys(initialValues) as Array<keyof FormikFormProps>;

  const elements = formKeys.map((key) => (
    <BtgInput<FormikFormProps>
      key={key}
      inputName={key}
      inputLabel={`${key[0].toUpperCase()}${key.slice(1)}`}
      formikProps={formik}
      customBlur={customHandler}
      customClick={customHandler}
    />
  ));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit(event.currentTarget.values);
  };

  console.log(formik.values);

  return (
    <div
      style={{
        backgroundColor: '#101010',
        height: '100vh',
        paddingBlock: '3rem',
        paddingInline: '5rem',
      }}
    >
      <form
        action={undefined}
        onSubmit={handleSubmit}
        onReset={() => formik.resetForm()}
        encType="application/json"
      >
        <div className={styles['appStyles']}>
          <BtgFieldset
            fieldLabel="Label 1"
            style={{ color: 'azure', borderColor: 'azure' }}
            InputElement={
              <BtgInput<FormikFormProps>
                inputName={'id'}
                formikProps={formik}
                inputLabel={'Id'}
                customBlur={customHandler}
                customClick={customHandler}
              />
            }
          />
          <BtgFieldset
            fieldLabel="Label 2"
            style={{ color: 'azure', borderColor: 'azure' }}
            InputElement={elements}
          />

          <BtgFieldset
            fieldLabel="Actions"
            style={{ color: 'azure', borderColor: 'azure' }}
            InputElement={
              <div>
                <button type="submit">Submit</button>
              </div>
            }
          />
        </div>
      </form>
    </div>
  );
}

export default App;

function customHandler() {
  console.log(Math.random());
}
