import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Landing from './pages/Landing/Landing.jsx'
import Country from './pages/Country/Country.jsx'

import HomeLayout from './pages/HomeLayout/HomeLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
        {
          index: true,
          element: <Landing/>
        },

      {
        path:'country/:name',
        element: <Country />
      }
    ]
  }
])


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
