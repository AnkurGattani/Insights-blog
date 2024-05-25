import React, { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './services/auth';
import { login, logout } from './store/slices/authSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login(userData));
      }
      else {  // if user is not logged in, logout to make sure state is always updated
        dispatch(logout());
      }
    })
    .catch((error) => {
      console.log('Error in App :: useEffect : ', error);
    })
    .finally( () => setLoading(false))
  }, []);

  if(loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  }
  else {
    return (
      <>
        <h1>Welcome to Insights!</h1>
      </>
    )
  }
}

export default App
