import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import routes from './app/routes';
import './styles.css';

const rotuer = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <RouterProvider router={rotuer} />
  </StrictMode>,
);
