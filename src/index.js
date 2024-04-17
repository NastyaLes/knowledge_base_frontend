import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/Login/Login';
import Users from './components/Admin/Users';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
      path: "/home",
      element: <App />,
      errorElement: <div>Error404</div>
    },
    {
        path: "/",
        element: <Login />,
        errorElement: <div>Error404</div>
    },
    {
      path: "/admin",
      element: <Users />,
      errorElement: <div>Error404</div>
    },
  ]
)

root.render(
    <React.StrictMode>
        <div className="wrapper">
            <RouterProvider router={router} />
        </div>
    </React.StrictMode>
);