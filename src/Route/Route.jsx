import { createBrowserRouter } from "react-router-dom";
import Main from "../Laout/Main";
import Home from "../Pagse/Home/Home/Home";
import Login from "../Pagse/Login/Login";
import Singup from "../Pagse/Singup/Singup";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<Singup></Singup>
        }
      ]
    },
  ]);

  export default router