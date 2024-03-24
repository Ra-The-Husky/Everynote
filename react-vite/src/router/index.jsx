import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Homepage from '../components/Home';
import Notes from '../components/Notes'
import NoteDetails from '../components/Notes/NoteDetails'
import NewNote from '../components/Notes/NewNote'
import EditNote from '../components/Notes/EditNote'
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
        path: '/notes/:noteId',
        element: <NoteDetails />
      },
      {
        path: '/notes/new-note',
        element: <NewNote />
      },
      {
        path: '/notes/:noteId/edit',
        element: <EditNote />
      },
      {
        path: "/tasks",
        element: <h1>Tasks Page</h1>,
      },
    ],
  },
]);
