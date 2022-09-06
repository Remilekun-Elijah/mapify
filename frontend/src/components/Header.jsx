import React from 'react';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ILogout } from '../utils/icons';

const Container = styled.div`
 padding: 5px 10%;
`,
Logo = styled.h1``

const Header = () => {
const navigate = useNavigate();
  const logout = e => {
    localStorage.removeItem("authToken")
    navigate("/")
  }

 return (
  <div >
    <Container className='bg-slate-500 flex justify-between'>
      <Logo className='text-xl text-white cursor-pointer' onClick={_=> navigate("/dashboard")}> Mapify </Logo>
      
      {window.location.pathname !== "/" ? <button onClick={logout} className="flex items-center text-white hover:bg-black  px-3 rounded"><RiLogoutCircleLine size={18} color={'var(--C_white)'} className='mr-2' /> Logout</button> : null}
     </Container> 
  </div>
 );
}

export default Header;
