import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { StorageContext } from '../../Context/StorageContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import { useNavigate } from 'react-router-dom';
import './MyNav.css';

export default function MyNav() {

  const [authMenu, setAuthMenu] = useState(false);
  const [blogMenu, setBlogMenu] = useState(false);
  const [logMenu, setLogMenu] = useState(false);
  const [userImg, setUserImg] = useState("");
  const {token, setToken} = useContext(StorageContext);
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const getUserImg = async ()=>{
    try{
      const response = await fetch(`http://localhost:3001/api/authors/${user}`,
      {
        method:"GET",
        headers: {"Authorization":"Bearer " + token}
      });
      if(response.ok){
        let json = await response.json();
        const {avatar} = json;
        setUserImg(avatar);
      }else{
        setToken("");
        setUser("");
        navigate("/");
      }
    }catch(err){
      console.log(err);
    }

  };

  useEffect(()=>{
    if(token){
      getUserImg();
    };
  });
  
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Nav className='d-flex justify-content-between w-100'>
        <div className='d-flex'>
          <Navbar.Brand onClick={()=>navigate("/")} >CorriereAnnunci.it</Navbar.Brand>
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
        <div className='drop-cont d-flex'>
          <div ></div>
          {token && <button 
            className='button-lgd m-0 p-0'
            style={{backgroundImage:`url(${userImg && userImg})`, backgroundSize:"cover", backgroundPosition:"center"}}
            onClick={()=>{
              setAuthMenu(false);
              setBlogMenu(false);
              setLogMenu(!logMenu);
            }}
            ></button>}
          {!token && <button 
            type='button'
            className='log-btn'
            onClick={()=>{
              setAuthMenu(false);
              setBlogMenu(false);
              setLogMenu(!logMenu);
            }}
          >
            <FontAwesomeIcon icon={faUser}/>
          </button>}
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
                setUser("");
              }}>Log Out</Link>}
          </div>
        </div>
      </Nav>
    </Container>  
  </Navbar>
)}