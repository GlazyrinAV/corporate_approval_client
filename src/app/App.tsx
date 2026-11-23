import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Suspense } from 'react';

import { AppRoutes } from './AppRoutes';
import { Header } from '../widgets/header/Header';
import { Footer } from '../widgets/footer/Footer';
import styles from './App.module.css';
import { Preloader } from '../shared/ui/preloader/Preloader';

const App = () => (
  <div className={styles.mainContainer}>
    <Header />
    <div className={styles.mainContent}>
      <Suspense fallback={<Preloader />}>
        <AppRoutes />
      </Suspense>
    </div>
    <Footer />
  </div>
);

export default App;
