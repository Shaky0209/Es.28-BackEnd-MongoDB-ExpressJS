import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { StorageContext } from '../../../Context/StorageContextProvider';
import FormBlog from '../../../Components/FormBlog/FormBlog.jsx';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton.jsx';
import ResponseBlog from '../../../Components/ResponseBlog/ResponseBlog.jsx';

export default function GetBlog() {

    const [id, setId] = useState("");
    const [data, setData] = useState([]);
    const label = "Send Request";
    const {token, setToken} = useContext(StorageContext);

    const fetchFncGet = async ()=>{
        try{
            let response = await fetch("//localhost:3001/blog/post",
            {
                method:"GET",
                headers:{"Authorization":"Bearer " + token},
            })
            if(response.ok){
            console.log("Fetch blog GET Riuscita.");
            let json = await response.json();
            console.log(json);
            setData(json);
            }else{
            console.log("Fetch blog GET Fallita.");
            }
            
        }catch(err){
            console.error(err);
        }
    }

    const fetchFncGetId = async ()=>{
        try{
            let response = await fetch(`http://localhost:3001/blog/post/${id}`, {headers:{"Authorization":"Bearer " + token}})

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
    
    console.log("data= ", data);
    
  return (
    <Container fluid className='relative'>
      <FormBlog setId ={setId} />
      <MultipleButton content={label} id={id} btnFnc={fetchFncGetId} />
      {data && <ResponseBlog content={data} refresh={fetchFncGet} />}
    </Container>
  )
}
