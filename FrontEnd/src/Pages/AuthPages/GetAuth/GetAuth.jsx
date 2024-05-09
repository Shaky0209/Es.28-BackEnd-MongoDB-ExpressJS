import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { StorageContext } from '../../../Context/StorageContextProvider.jsx';
import Form from '../../../Components/FormAuthor/FormAuthor.jsx';
import Response from '../../../Components/ResponseAuthor/ResponseAuthor.jsx';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton.jsx';

export default function Get() {

  const label = "Send Request";
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const {token} = useContext(StorageContext);
  
  

  
  const fetchFncGet = async ()=>{
    try{
      let response = await fetch("//localhost:3001/api/authors",
      {
        method:"GET",
        headers:{"Authorization":"Bearer " + token}
      })
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
      let response = await fetch(`http://localhost:3001/api/authors/${id}`, 
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
    <Container fluid className='relative'>
      <Form setId ={setId} />
      <MultipleButton content={label} id={id} btnFnc={fetchFncGetId} />
      {data && <Response content={data} refresh={fetchFncGet} />}
    </Container>
  )
}