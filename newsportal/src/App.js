import logo from './logo.svg';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Master from './Component/Layout/Master';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './Component/Pages/Category';


import Contact from './Component/Pages/Contact';
import BookingPage from "./Component/Pages/BookingPage"; // adjust path if needed
import SinleCar from './Component/Pages/SinleCar';


import Login from './Component/Auth/Login';
import Dashboard from './Component/Pages/Dashboard';
import AddCategory from './Component/Pages/AddCategory';
import ManageCategory from './Component/Pages/ManageCategory';
import UpdateCategory from './Component/Pages/UpdateCategory';
import ManageCar from './Component/Pages/ManageCar';
import UpdateCar from './Component/Pages/UpdateCar';
import UserMaster from './Component/Layout/UserMaster';
import Register from './Component/Auth/Register';
import Car from './Component/Pages/Car';

import Home from './Component/Pages/Home';
import BookingConfirm from './Component/Pages/BookingConfirm';
import AddCar from './Component/Pages/AddCar';
import AdminBookinglist from './Component/Pages/AdminBookinglist';


function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Master />}>
            <Route path="/admin/" element={<Dashboard/>} />
            <Route path="/admin/addcategory" element={<AddCategory/>} />
            <Route path="/admin/managecategory" element={<ManageCategory/>} />
            <Route path="/admin/updatecategory/:id" element={<UpdateCategory/>} />
            <Route path="/admin/addnews" element={<AddCar/>} />
            <Route path="/admin/managenews" element={<ManageCar/>} />
            <Route path="/admin/updatenews/:id" element={<UpdateCar/>} />
            <Route path="/admin/bookingList" element={<AdminBookinglist />} />
          </Route>
          <Route path="/" element={<UserMaster />}>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<Login/>} />
          
            <Route path="/cars" element={<Car/>} />
             <Route path="/sinlecar" element={<SinleCar/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/confirm" element={<BookingConfirm />} />
             
           
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
