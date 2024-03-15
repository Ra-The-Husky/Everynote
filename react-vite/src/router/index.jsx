import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Homepage from '../components/Home';
import Notebooks from '../components/Notebooks';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoginFormPage />,
      },
      {
        path: '/home',
        element: <Homepage />
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: "/notebooks",
        element: <Notebooks />,
      },
      {
        path: "/notes",
        element: <h1>Notes Page</h1>,
      },
      {
        path: "/tasks",
        element: <h1>Tasks Page</h1>,
      },
    ],
  },
]);
