import { Outlet } from "react-router-dom";
import Fotter from "../Pagse/Sharde/Fotter/Fotter";
import Navbar from "../Pagse/Sharde/Navbar/Navbar";


const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Fotter></Fotter>
        </div>
    );
};

export default Main;