import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { AppRoutes } from './AppRoutes';
import { Header } from '../widgets/header/Header';
import { Footer } from '../widgets/footer/Footer';

const App = () => (
  <div className='main_container'>
    <Header />
    <div className='main_content'>
      <AppRoutes />
    </div>
    <Footer />
  </div>
);

export default App;
