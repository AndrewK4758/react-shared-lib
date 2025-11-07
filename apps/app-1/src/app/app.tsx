import { AnotherElement } from '@btg/shared-ui';
import { useFormik } from 'formik';
import styles from './app.module.css';

type FormikFormProps = {
  name: string;
  id: string;
};

export function App() {
  const formik = useFormik<FormikFormProps>({
    initialValues: {
      name: 'name',
      id: 'id',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div style={{ backgroundColor: '#101010', height: '100vh' }}>
      <form
        onSubmit={formik.submitForm}
        onReset={() => formik.resetForm()}
        encType="application/json"
      >
        <div className={styles['appStyles']}>
          <AnotherElement
            fieldLabel="Label 1"
            label="Input 1"
            formik={formik}
            name={'id'}
            style={{ color: 'azure' }}
          />
          <AnotherElement
            fieldLabel="Label 2"
            label="Input 2"
            formik={formik}
            name={'name'}
            style={{ color: 'azure' }}
          />
        </div>
      </form>
    </div>
  );
}

export default App;
