import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { StorageContext } from '../../Context/StorageContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import './MyNav.css';

export default function MyNav() {

  const [authMenu, setAuthMenu] = useState(false);
  const [blogMenu, setBlogMenu] = useState(false);
  const [logMenu, setLogMenu] = useState(false);
  const {token, setToken} = useContext(StorageContext);
  const {user, setuser} = useContext(UserContext);

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Nav className='d-flex justify-content-between w-100'>
        <div className='d-flex'>
          <Navbar.Brand href="#home">CorriereAnnunci.it</Navbar.Brand>
          <Link to="/" className='homeLink'>Home</Link>
          <div className='drop-cont'>
            <div>
              {token && <button 
                className='auth-link'
                type='link'
                onClick={()=>{
                  setAuthMenu(!authMenu);
                  setBlogMenu(false);
              }}>Authors <FontAwesomeIcon icon={faCaretDown} /></button>}
            </div>
            <div className= {`drop-menu d-flex flex-column ${authMenu ? "" : "d-none"}`}>
              <Link to="/api/authors/GET" onClick={()=>setAuthMenu(!authMenu)} className='menu-link'>GET</Link>
              <Link to="/api/authors/POST" onClick={()=>setAuthMenu(!authMenu)} className='menu-link'>POST</Link>
            </div>
          </div>
          <div className='drop-cont'>
            <div>
              {token && <button
                className='auth-link'
                type='link'
                onClick={()=>{
                  setBlogMenu(!blogMenu);
                  setAuthMenu(false);
                  setLogMenu(false);
                }}>Blog <FontAwesomeIcon icon={faCaretDown} /></button>}
            </div>
            <div className= {`drop-menu d-flex flex-column ${blogMenu ? "" : "d-none"}`}>
              <Link to="/blog/post/GET" onClick={()=>setBlogMenu(!blogMenu)} className='menu-link'>GET</Link>
              <Link to="/blog/post/POST" onClick={()=>setBlogMenu(!blogMenu)} className='menu-link'>POST</Link>
            </div>
          </div>  
        </div>
        <div className='drop-cont'>
          <button 
            type='button'
            className='log-btn'
            onClick={()=>{
              setAuthMenu(false);
              setBlogMenu(false);
              setLogMenu(!logMenu);
            }}
          >
            <FontAwesomeIcon icon={faUser}/>
          </button>
          <div className={`drop-log d-flex flex-column ${logMenu ? "" : "d-none"}`}>
            {!token && <Link to="/user/login/" onClick={()=>setLogMenu(false)}>Login</Link>}
            {!token && <Link to="/user/register/" onClick={()=>setLogMenu(false)}>Registrati</Link>}
            {user && <Link to={`/api/authors/details/${user}`} onClick={()=>setLogMenu(false)}>Profilo</Link>}
            {token && <Link
              to="/"
              onClick={()=>{
                setLogMenu(false);
                localStorage.setItem("token", "");
                localStorage.setItem("user", "");
                setToken("");
                setuser("");
              }}>Log Out</Link>}
          </div>
        </div>
      </Nav>
    </Container>  
  </Navbar>
)}