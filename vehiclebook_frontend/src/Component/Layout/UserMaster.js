import UserHeader from "./UserHeader";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
export default function UserMaster(){
    return(
        <>
        <UserHeader/>
        <Outlet/>
        <Footer/>
        </>
    )
}