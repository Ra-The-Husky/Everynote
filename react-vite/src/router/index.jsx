import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Homepage from '../components/Home';
import Notes from '../components/Notes'
import NoteDetails from '../components/Notes/NoteDetails'
import NewNote from '../components/Notes/NewNote'
import EditNote from '../components/Notes/EditNote'
import Notebooks from '../components/Notebooks';
import NotebookDetails from '../components/Notebooks/NotebookDetails';
import Tasks from '../components/Tasks';
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
        path: "/notebooks/:notebookId",
        element: <NotebookDetails />,
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
        element: <Tasks />
      },
      {
        path: "/not-found",
        element: <h1>Not Found</h1>
      },
      {
        path: "/unauthorized",
        element: <h1>Unauthorized</h1>
      },
      {
        path: '*',
        element: <h1>Not Found</h1>
      }
    ],
  },
]);
