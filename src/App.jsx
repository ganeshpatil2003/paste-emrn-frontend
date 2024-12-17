import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router"
import MainLayout from "./Layout/MainLayout"
import HomePage from "./pages/HomePage"
import PastePage from "./pages/PastePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import ProfilePage from "./pages/ProfilePage"
import UpdatePage from "./pages/UpdatePage"
import ViewPage from "./pages/ViewPage"
import SearchPage from "./pages/SearchPage"
const routes = createBrowserRouter([
  {
    path : '/',
    element : <MainLayout/>,
    children : [
      {
        path : '/',
        element : <HomePage/>
      },
      {
        path : 'pastes',
        element : <PastePage/>
      },
      {
        path : 'signin',
        element : <SignInPage/>
      },
      {
        path : 'signup',
        element : <SignUpPage/>
      },
      {
        path : 'profile',
        element : <ProfilePage/>
      },
      {
        path : 'update/:id',
        element : <UpdatePage/>
      },
      {
        path : 'view/:id',
        element : <ViewPage/>
      },
      {
        path : 'pastes/search',
        element : <SearchPage/>
      }
    ]
  }
])
const App = () => {
 return (
   <main>
      <RouterProvider router={routes}/>
   </main>
  )
}

export default App
