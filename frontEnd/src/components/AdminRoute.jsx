import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Perftracker } from '../Perftracker';

export default function AdminRoute({children}) {

  const { state } = useContext(Perftracker);
  const { userInfo } = state;

  return userInfo && userInfo.isAdmin ? children : <Navigate to='/signin' />
  
}
