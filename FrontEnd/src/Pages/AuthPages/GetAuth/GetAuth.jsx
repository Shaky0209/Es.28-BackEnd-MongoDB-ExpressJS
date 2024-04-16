import React, { useState, useEffect } from 'react';
import Response from '../../../Components/ResponseAuthor/ResponseAuthor.jsx';
import Form from '../../../Components/FormAuthor/FormAuthor.jsx';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton.jsx';
import { Container } from 'react-bootstrap';
// import './Get.css';

export default function Get() {

  const label = "Send Request";
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  
  useEffect(()=>{
    fetchFncGet();
    console.log("data = ", data);
  }, [setData]);

  useEffect(()=>{
    console.log(id);
  }, [id]);
  

  const fetchFncGet = async ()=>{
    try{
      let response = await fetch("//localhost:3001/api/authors", {method:"GET"})
      if(response.ok){
        console.log("Fetch authors GET Riuscita.");
        let json = await response.json();
        setData(json);
      }else{
        console.log("Fetch authors GET Fallita.");
      }
      
    }catch(err){
      console.error(err);
    }
  }

  const fetchFncGetId = async ()=>{
    try{
      let response = await fetch(`http://localhost:3001/api/authors/${id}`)
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

  return (
    <Container fluid className='relative'>
      <Form setId ={setId} />
      <MultipleButton content={label} id={id} btnFnc={fetchFncGetId} />
      <Response content={data} refresh={fetchFncGet} />
    </Container>
  )
}
