import React, { useContext, useEffect } from 'react';
import {Container, Row, Col, Alert, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { StorageContext } from '../../Context/StorageContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import './Home.css';

export default function Home() {
  const {token, setToken}= useContext(StorageContext);
  const {setUser}= useContext(UserContext);

  const fetchGetMe = async()=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/log/me`, 
        {
          method:"GET",
          headers:{"Authorization":"Bearer " + token},
        }
      )
      if(response.ok){
        console.log("Fetch me OK")
        let json = await response.json()
        setUser(json._id);
        localStorage.setItem("user", json._id);
      }else{
        console.log("Fetch me KO!")
        
      }
    }catch(err){
      console.log(err);
      console.error("err ", err)
    }
  }
  
  useEffect(()=>{
    let params = new URLSearchParams(document.location.search);
    let accessToken = params.get("accessToken");
    if(accessToken){
      setToken(accessToken)
    }else{

    }
  }, [])
  

  useEffect(()=>{
    if(token){
      localStorage.setItem("token", token);
      fetchGetMe();
    }

  },[token]);
  

  return (
    <Container fluid className='d-flex justify-content-center align-items-center'>
      <Row className='mt-1 mb-5 pb-5 w-100'>
        <Col sm={12} md={2} className='order-1 order-md-0' >
          <div className='p-2'>
            <h6 className='text-center py-2' >I nostri Partner:</h6>
            <div 
              className='border border-2 rounded my-2'
              style={{
                height:"185px",
                backgroundImage:`url('https://cdn-profiles.tunein.com/s63649/images/logog.png?t=1')`,
                backgroundSize:"contain",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
              }}>
            </div>
            <div 
              className='border border-2 rounded my-2' 
              style={{
                height:"185px",
                backgroundImage:`url('https://tse2.mm.bing.net/th?id=OIP.1McmodQ6F58O6cnqq-wdEAAAAA&pid=Api')`,
                backgroundSize:"contain",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
              }}
              >
            </div>
            <div 
              className='border border-2 rounded my-2 p-5' 
              style={{
                height:"185px",
                backgroundImage:`url('https://tse4.mm.bing.net/th?id=OIP.6HNe_8RLtYBrPP9UJCGv-gHaFc&pid=Api')`,
                backgroundSize:"contain",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
              }}
              >
            </div>
            <div 
              className='border border-2 rounded my-2 p-5' 
              style={{
                height:"185px",
                backgroundImage:`url('https://tse3.mm.bing.net/th?id=OIP.PoFtYQBpZtu54iW4z69OFAAAAA&pid=Api')`,
                backgroundSize:"contain",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
              }}
              >
            </div>
            <div 
              className='border border-2 rounded my-2 p-5' 
              style={{
                height:"185px",
                backgroundImage:`url('https://tse1.mm.bing.net/th?id=OIP.u794eLQCfGz4cRGmXlUIYAHaHa&pid=Api')`,
                backgroundSize:"contain",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
              }}
              >
            </div>
          </div>
        </Col>
        <Col sm={12} md={8} className='order-0 order-md-1'>
          <div className='border border-1 rounded p-2 h-100'>
            {!token && <Alert className='text-center mt-1 p-1' variant='danger' >
              I nostri contenuti sono accessibili solo da utenti registrati! 
              <Link to='/user/register/'> Registrati! </Link> o <Link to='/user/login/'> Accedi! </Link>
              La registrazione è semplice e gratuita!
            </Alert>}
            <h1 className='text-center border border 1 rounded mt-2'>In Prima Pagina</h1>
            <h2 className='text-center mt-2'>Spighe Verdi: le Marche fanno boom. Seconda regione d’Italia, con 8 comuni premiati: ecco quali sono</h2>
            <p>Abbiamo intervistato due dei sindaci che hanno ottenuto il prestigioso riconoscimento assegnato dalla Fee, la stessa organizzazione che assegna le Bandiere Blu</p>
            <p className='art-author'>Di Nicolò Moricci - 5 Maggio 2024</p>
            <Image className='w-100' src='https://www.centropagina.it/wp-content/uploads/2023/07/Girasole-Marche-1.jpg' />
            <p className='mt-1' >ANCONA – Otto spighe verdi per le Marche: secondo posto al livello italiano per il riconoscimento attribuito dalla ˈFee-Foundation for environmental educationˈ. Per intenderci, si tratta della stessa organizzazione che rilascia nel mondo le Bandiere Blu per le località costiere e che premia i migliori comuni rurali. Anzi, che premia le località che scelgono strategie di gestione del territorio virtuose che migliorino le condizioni dell’ambiente e la qualità della vita dell’intera comunità.</p>
          </div>
        </Col>
        <Col sm={12} md={2} className='order-2'>
          <div className='p-2'>
            <h6 className='text-center py-2' >I nostri Sponsor:</h6>
            <div 
              className='border border-2 rounded my-2 p-5' 
              style={{
                height:"185px",
                backgroundImage:`url('https://tse2.mm.bing.net/th?id=OIP.hex2nGVngplxOM991Qqu9wHaHa&pid=Api')`,
                backgroundSize:"contain",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
              }}
              >
            </div>
            <div 
              className='border border-2 rounded my-2 p-5' 
              style={{
                height:"185px",
                backgroundImage:`url('https://tse1.mm.bing.net/th?id=OIP.OI0KZUzSDNxW2WVXGyQ5TQAAAA&pid=Api')`,
                backgroundSize:"contain",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
              }}
              >
            </div>
            <div 
              className='border border-2 rounded my-2 p-5' 
              style={{
                height:"185px",
                backgroundImage:`url('https://tse2.mm.bing.net/th?id=OIP.SM1P6uafd6BZRduZmY2K3wHaHa&pid=Api')`,
                backgroundSize:"contain",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
              }}
              >
            </div>
            <div 
              className='border border-2 rounded my-2 p-5' 
              style={{
                height:"185px",
                backgroundImage:`url('https://tse2.mm.bing.net/th?id=OIP.sr4tC9ZZm6cmU00CbBa9VwHaHa&pid=Api')`,
                backgroundSize:"contain",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
              }}
              >
            </div>
            <div 
              className='border border-2 rounded my-2 p-5' 
              style={{
                height:"185px",
                backgroundImage:`url('http://www.zerodelta.net/immagini/immagini2/logo_nuseo.jpg')`,
                backgroundSize:"contain",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat"
              }}
              >
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}