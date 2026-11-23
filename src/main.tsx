import { Suspense } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import App from './app/App.tsx';
import store from './app/store.ts';
import { Preloader } from './shared/ui/preloader/Preloader';
import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<Preloader />}>
          <App />
        </Suspense>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
