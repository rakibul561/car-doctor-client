import { createBrowserRouter } from "react-router-dom";
import Main from "../Laout/Main";
import Home from "../Pagse/Home/Home/Home";
import Login from "../Pagse/Login/Login";
import Singup from "../Pagse/Singup/Singup";
import Cheakout from "../Pagse/Cheackout/Cheakout";
import Booking from "../Pagse/Booking/Booking";
import PrivetRoute from "./PrivetRoute";

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
        },
          {
            path:'/chekout/:id',
            element: <PrivetRoute><Cheakout></Cheakout></PrivetRoute>,
            loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
          },
          {
            path:'/bookings',
            element: <PrivetRoute><Booking></Booking></PrivetRoute>
          }
      ]
    },
  ]);

  export default router