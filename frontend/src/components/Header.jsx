import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
 padding: 5px 10%;
`,
Logo = styled.h1``

const Header = () => {
const navigate = useNavigate();
  const logout = e => {
    localStorage.removeItem("userAuth")
    navigate("/")
  }

 return (
  <div >
    <Container className='bg-slate-500 flex justify-between'>
      <Logo className='text-xl text-white'> Mapify </Logo>

      {window.location.pathname !== "/" ? <button onClick={logout} className="text-white hover:bg-black  px-3 rounded">Logout</button> : null}
     </Container> 
  </div>
 );
}

export default Header;
