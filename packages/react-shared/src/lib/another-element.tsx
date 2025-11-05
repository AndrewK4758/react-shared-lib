import styles from './another-element.module.css';
import { SharedUi } from './shared-ui';

export function AnotherElement() {
  return (
    <div className={styles['container']}>
      <h3>Welcome to AnotherElement!</h3>

      <SharedUi />
    </div>
  );
}

export default AnotherElement;
