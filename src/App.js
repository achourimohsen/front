import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from './components/header/Header';
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import ReportsPage from "./pages/reports-page/ReportsPage";
import CreateReport from './pages/create-reports/CreateReport';
import AdminDashboard from "./pages/admin/AdminDashboard";
import Footer from './components/footer/Footer';
import ReportDetails from './pages/report-details/ReportDetails';
import Category from './pages/category/Category';
import Profile from './pages/profile/Profile';
import UsersTable from './pages/admin/UsersTable';
import ReportsTable from './pages/admin/ReportTable';
import CategoriesTable from './pages/admin/CategoriesTable';
import CommentsTable from './pages/admin/CommentsTable';
import ForgotPassword from './pages/forms/ForgotPassword';
import ResetPassword from './pages/forms/ResetPassword';
import NotFound from './pages/not-found/NotFound';
import Helps from './pages/helps/Helps';
import Faq from './pages/helps/faq/Faq';
import UserGuide from './pages/helps/user-guide/UserGuide';
import TechnicalSupport from './pages/helps/technial-support/TechnicalSupport';
import VideoTutorials from './pages/helps/video-tutorials/VideoTutorials';
import CommunityForum from './pages/helps/community/CommunityForum';

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <BrowserRouter>
      <ToastContainer theme='colored' position='top-center' />
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile/:id' element={user ? <Profile /> : <Navigate to="/" />} />

        <Route path="helps">
          <Route index element={<Helps />} />
          <Route path='faq' element={<Faq />} />
          <Route path='userGuide' element={<UserGuide />} />
          <Route path='technicalSupport' element={<TechnicalSupport />} />
          <Route path='videoTutorials' element={<VideoTutorials />} />
          <Route path='communityForum' element={<CommunityForum />} />
        </Route>

        <Route path="reports">
          <Route index element={<ReportsPage />} />
          <Route path='create-report' element={user ? <CreateReport /> : <Navigate to="/" />} />
          <Route path='details/:id' element={user ? <ReportDetails /> : <Navigate to="/" />} />
          <Route path='categories/:category' element={user ? <Category /> : <Navigate to="/" />} />
        </Route>

        <Route path="admin-dashboard">
          <Route index element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path='users-table' element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />} />
          <Route path='reports-table' element={user?.isAdmin ? <ReportsTable /> : <Navigate to="/" />} />
          <Route path='categories-table' element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />} />
          <Route path='comments-table' element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />} />
        </Route>

        <Route path='*' element={<NotFound />}></Route>

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
