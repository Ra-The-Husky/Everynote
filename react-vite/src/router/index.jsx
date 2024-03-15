import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Homepage from '../components/Home';
import Notes from '../components/Notes'
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
        element: <h1>Notebooks Page</h1>,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/tasks",
        element: <h1>Tasks Page</h1>,
      },
    ],
  },
]);
