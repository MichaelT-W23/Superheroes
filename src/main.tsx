import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// @ts-ignore
import store from './states/store';

// @ts-ignore
import App from './App.jsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </StrictMode>
);
