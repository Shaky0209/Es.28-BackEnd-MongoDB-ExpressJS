import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import FormBlog from '../../../Components/FormBlog/FormBlog.jsx';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton.jsx';
import ResponseBlog from '../../../Components/ResponseBlog/ResponseBlog.jsx';

export default function GetBlog() {

    const [id, setId] = useState("");
    const [data, setData] = useState([]);
    const label = "Send Request";

    const fetchFncGet = async ()=>{
        try{
            let response = await fetch("//localhost:3001/blog/post", {method:"GET"})
            if(response.ok){
            console.log("Fetch blog GET Riuscita.");
            let json = await response.json();
            console.log(json);
            setData(json);
            console.log("data= ", data);
            }else{
            console.log("Fetch blog GET Fallita.");
            }
            
        }catch(err){
            console.error(err);
        }
    }

    const fetchFncGetId = async ()=>{
        try{
            let response = await fetch(`http://localhost:3001/blog/post/${id}`)
            if(response.ok){
            console.log("Fetch Riuscita.");
            let json = [await response.json()];
            console.log("fetchBtnId json= ", json);
            setData(json);
            }else{
            console.log("Fetch Fallita.");
            }
        }catch (err){
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchFncGet();
    }, []);
    
  return (
    <Container fluid className='relative'>
      <FormBlog setId ={setId} />
      <MultipleButton content={label} id={id} btnFnc={fetchFncGetId} />
      <ResponseBlog content={data} refresh={fetchFncGet} />
    </Container>
  )
}
