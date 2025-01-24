import logo from './logo.svg';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Master from './Component/Layout/Master';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './Component/Pages/Category';
import About from './Component/Pages/About';
import LatestNews from './Component/Pages/LatestNews';
import Contact from './Component/Pages/Contact';

import Login from './Component/Auth/Login';
import Dashboard from './Component/Pages/Dashboard';
import AddCategory from './Component/Pages/AddCategory';
import ManageCategory from './Component/Pages/ManageCategory';
import UpdateCategory from './Component/Pages/UpdateCategory';
import AddNews from './Component/Pages/AddNews';
import ManageNews from './Component/Pages/ManageNews';
import UpdateNews from './Component/Pages/UpdateNews';
import AddComment from './Component/Pages/AddComment';
import AddPoll from './Component/Pages/AddPoll';
import ManagePoll from './Component/Pages/ManagePoll';
import UpdatePoll from './Component/Pages/UpdatePoll';
import UpdatePollOption from './Component/Pages/UpdatePollOption';
import UserMaster from './Component/Layout/UserMaster';
import Register from './Component/Auth/Register';
import News from './Component/Pages/News';
import NewsIdea from './Component/Pages/NewsIdea';
import Polls from './Component/Pages/Polls';

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
            <Route path="/admin/addnews" element={<AddNews/>} />
            <Route path="/admin/managenews" element={<ManageNews/>} />
            <Route path="/admin/updatenews/:id" element={<UpdateNews/>} />
            <Route path="/admin/addcomment/" element={<AddComment/>} />
            <Route path="/admin/addpoll/" element={<AddPoll/>} />
            <Route path="/admin/managepoll/" element={<ManagePoll/>} />
            <Route path="/admin/updatepoll/:id" element={<UpdatePoll/>} />
            <Route path="/admin/updatepolloption/:id" element={<UpdatePollOption/>} />
          </Route>
          <Route path="/" element={<UserMaster />}>
          <Route path="/" element={<Category />} />
          <Route path="/login" element={<Login/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/news" element={<News/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/addcomment/" element={<AddComment/>} />
            <Route path="/newsIdea/" element={<NewsIdea/>} />
            <Route path="/polls/" element={<Polls/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
