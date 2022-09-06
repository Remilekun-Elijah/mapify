import React from 'react';
import {
 Navigate,
 Outlet
} from 'react-router-dom';
import Storage from './storage';

const PrivateRoutes = () => {
 return (
  <>
  {Storage.get("authToken") ? < Outlet / > : < Navigate to = "/" /> }
  </>
  )
}

export default PrivateRoutes;