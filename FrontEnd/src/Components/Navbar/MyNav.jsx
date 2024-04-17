import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './MyNav.css';

export default function MyNav() {

  const [authMenu, setAuthMenu] = useState(false);
  const [blogMenu, setBlogMenu] = useState(false);

  return (
    <Navbar bg="primary" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#home">API MongoDB ExpressJS</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className='homeLink'>Home</Link>
            <div className='auth-cont'>
              <div>
                <button 
                  className='auth-link'
                  type='link'
                  onClick={()=>{
                    setAuthMenu(!authMenu);
                    setBlogMenu(false);
                }}>Authors <FontAwesomeIcon icon={faCaretDown} /></button>
              </div>
              <div className= {`auth-menu d-flex flex-column ${authMenu ? "" : "d-none"}`}>
                <Link to="/api/authors/GET" onClick={()=>setAuthMenu(!authMenu)} className='menu-link'>GET</Link>
                <Link to="/api/authors/POST" onClick={()=>setAuthMenu(!authMenu)} className='menu-link'>POST</Link>
              </div>
            </div>
            <div className='auth-cont'>
              <div>
                <button
                  className='auth-link'
                  type='link'
                  onClick={()=>{
                    setBlogMenu(!blogMenu);
                    setAuthMenu(false);
                  }}>Blog <FontAwesomeIcon icon={faCaretDown} /></button>
              </div>
              <div className= {`auth-menu d-flex flex-column ${blogMenu ? "" : "d-none"}`}>
                <Link to="/blog/post/GET" onClick={()=>setBlogMenu(!blogMenu)} className='menu-link'>GET</Link>
                <Link to="/blog/post/POST" onClick={()=>setBlogMenu(!blogMenu)} className='menu-link'>POST</Link>
              </div>
            </div>
          </Nav>
        </Container>
      </Navbar>
  );
}