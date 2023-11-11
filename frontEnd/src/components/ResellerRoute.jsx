import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Perftracker } from '../Perftracker';

export default function ResellerRoute({children}) {

  const { state } = useContext(Perftracker);
  const { userInfo } = state;

  return userInfo && userInfo.isReseller ? children : <Navigate to='/' />
  
}
