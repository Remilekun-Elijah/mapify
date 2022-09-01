import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddLocation from './pages/AddLocation';

function App() {
  return (
    <BrowserRouter>
    {/* The rest of your app goes here */}
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/add-new-location' element={<AddLocation />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
