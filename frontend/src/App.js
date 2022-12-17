import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddLocation from './pages/AddLocation';
import ViewLocation from './pages/ViewLocation';
import { INotFound } from './utils/icons';
import Button from './components/Button';
import PrivateRoutes from './utils/PrivateRoutes';
import LocationDetails from './pages/LocationDetails';

function App() {
  
  return (
    <BrowserRouter>
    {/* The rest of your app goes here */}
    <Routes>
      <Route path='/' element={<Login />} />
      
       <Route element={<PrivateRoutes />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-new-location' element={<AddLocation />} />
        <Route path='/locations' element={<ViewLocation />} />
        <Route path="/locations/:locationId" element={<LocationDetails />} />
      </Route>

      <Route path='*' element={
        <div  className='flex flex-col items-center mt-20'>
          <img src={INotFound} style={{width: '300px', height: "250px"}} alt="Not found" />
        <h1 className='text-2xl'>PAGE NOT FOUND</h1>
        <Button 
            wrapperClass={"mt-10"}
            width={"260px"}
						value={"Go Back Home"}
            onClick={_=>window.location.href='/'}
            />
        </div>
      } />
      </Routes>
     
    
  </BrowserRouter>
  );
}

export default App;
