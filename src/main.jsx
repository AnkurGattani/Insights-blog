import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/LogIn.jsx'
import AddBlog from './pages/AddBlog.jsx'
import AllBlogs from './pages/AllBlogs.jsx'
import Blog from './pages/Blog.jsx'
import EditBlog from './pages/EditBlog.jsx'
import MyBlogs from './pages/MyBlogs.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'write',
        element: <AddBlog />
      },
      {
        path: 'blogs',
        element: <AllBlogs />
      },
      {
        path: 'blogs/:slug',
        element: <Blog />
      },
      {
        path: 'blogs/:slug/edit',
        element: <EditBlog />
      },
      {
        path: 'my-blogs',
        element: <MyBlogs />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
