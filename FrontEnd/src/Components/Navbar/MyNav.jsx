import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCaretDown, faCaretRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { StorageContext } from '../../Context/StorageContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import { useNavigate } from 'react-router-dom';
import './MyNav.css';

export default function MyNav() {

  const [blogMenu, setBlogMenu] = useState(false);
  const [logMenu, setLogMenu] = useState(false);
  const [userImg, setUserImg] = useState("");
  const {token, setToken} = useContext(StorageContext);
  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();

  console.log("USER == ", user);
  const getUserImg = async ()=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/authors/${user}`,
      {
        method:"GET",
        headers: {"Authorization":"Bearer " + token}
      });
      if(response.ok){
        let json = await response.json();
        console.log("json avatar == ", json)
        const {avatar} = json;
        console.log("avatar json == ", avatar);
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
    <>
    <Navbar expand="md" bg="primary" data-bs-theme="dark" className='d-none d-md-block'>
      <Container fluid>
        <Nav className='d-flex justify-content-between w-100'>
          <div className='d-flex'>
            <Navbar.Brand onClick={()=>navigate("/")}>CorriereAnnunci.it</Navbar.Brand>
            <Link to="/" className='homeLink'>Home</Link>
            <div className='drop-cont'>
              <div>
                {token && <button 
                  className='auth-link'
                  type='link'
                  onClick={()=>{
                    setBlogMenu(false);
                    navigate('/api/authors/GET');
                }}>Authors</button>}
              </div>
            </div>
            <div className='drop-cont'>
              <div>
                {token && <button
                  className='auth-link'
                  type='link'
                  onClick={()=>{
                    setBlogMenu(!blogMenu);
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
              style={{backgroundImage:`url(${user ? userImg && userImg : "https://download.logo.wine/logo/Microsoft_account/Microsoft_account-Logo.wine.png"})`, backgroundSize:"cover", backgroundPosition:"center"}}
              onClick={()=>{
                setBlogMenu(false);
                setLogMenu(!logMenu);
              }}
              ></button>}
            {!token && <button 
              type='button'
              className='log-btn'
              onClick={()=>{
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

    <Navbar expand="md" bg='primary' data-bs-theme="dark" className='d-md-none'>
      <Container fluid>
      <Navbar.Brand onClick={()=>navigate("/")} className='brand-size'>CorriereAnnunci.it</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <div className='d-flex flex-column w-100'>
            <Link to="/" className='homeLink'>Home</Link>
            <div className='drop-cont'>
              <div>
                {token && <button 
                  className='auth-link'
                  type='link'
                  onClick={()=>{
                    setBlogMenu(false);
                    navigate('/api/authors/GET');
                }}>Authors</button>}
              </div>
            </div>
            <div className='drop-cont'>
              <div>
                {token && <button
                  className='auth-link'
                  type='link'
                  onClick={()=>{
                    setBlogMenu(!blogMenu);
                    setLogMenu(false);
                  }}>Blog <FontAwesomeIcon icon={faCaretRight} /></button>}
              </div>
              <div className= {`drop-menu d-flex flex-column ${blogMenu ? "" : "d-none"}`}>
                <Link to="/blog/post/GET" onClick={()=>setBlogMenu(!blogMenu)} className='menu-link'>GET</Link>
                <Link to="/blog/post/POST" onClick={()=>setBlogMenu(!blogMenu)} className='menu-link'>POST</Link>
              </div>
            </div>  
          
            <div className='drop-cont d-flex'>
              {token && <button 
                className='button-lgd ms-2'
                style={{backgroundImage:`url(${userImg && userImg})`, backgroundSize:"cover", backgroundPosition:"center"}}
                onClick={()=>{
                  setBlogMenu(false);
                  setLogMenu(!logMenu);
                }}
                ></button>}
              {!token && <button 
                type='button'
                className='log-btn'
                onClick={()=>{
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
          </div>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
)}