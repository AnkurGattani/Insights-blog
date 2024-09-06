import React, { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './services/auth';
import { login, logout } from './store/slices/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        }
        else {  // if user is not logged in, logout to make sure state is always updated
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log('Error in App :: useEffect : ', error);
      })
      .finally(() => setLoading(false))
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap '>
      <div className='w-full flex flex-col justify-between' >
        <Header />
        <main className='mt-[8vh]'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App
