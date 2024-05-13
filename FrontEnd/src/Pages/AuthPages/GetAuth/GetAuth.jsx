import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { StorageContext } from '../../../Context/StorageContextProvider.jsx';
import Form from '../../../Components/FormAuthor/FormAuthor.jsx';
import Response from '../../../Components/ResponseAuthor/ResponseAuthor.jsx';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton.jsx';
import Spinner from 'react-bootstrap/Spinner';

export default function Get() {

  const label = "Send Request";
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [spin, setSpin] = useState(false)
  const {token} = useContext(StorageContext);
  
  

  
  const fetchFncGet = async ()=>{
    setSpin(true)
    try{
      let response = await fetch("//localhost:3001/api/authors",
      {
        method:"GET",
        headers:{"Authorization":"Bearer " + token}
      })
      if(response.ok){
        setSpin(false);
        console.log("Fetch authors GET Riuscita.");
        let json = await response.json();
        setData(json);
      }else{
        setSpin(false);
        console.log("Fetch authors GET Fallita.");
      }
      
    }catch(err){
      console.error(err);
    }
  }

  const fetchFncGetId = async ()=>{
    try{
      let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/authors/${id}`, 
        {
          headers:{"Authorization":"Bearer " + token}
        }
      )
      if(response.ok){
        console.log("Fetch authors ID Riuscita.");
        let json = [await response.json()];
        console.log("fetchBtnId json= ", json);
        setData(json);
      }else{
        console.log("Fetch authors ID Fallita.");
      }
      
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchFncGet();
    console.log("data = ", data);
  }, []);

  return (
    <Container fluid className='relative mb-5 pb-5'>
      <Form setId ={setId} />
      <MultipleButton content={label} id={id} btnFnc={fetchFncGetId} />
      <div className='d-flex justify-content-center'>
        <Spinner className={spin ? "" : "d-none"} animation="border" variant="primary" />
      </div>
      {data && <Response content={data} refresh={fetchFncGet} />}
    </Container>
  )
}