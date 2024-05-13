import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { StorageContext } from '../../../Context/StorageContextProvider';
import FormBlog from '../../../Components/FormBlog/FormBlog.jsx';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton.jsx';
import ResponseBlog from '../../../Components/ResponseBlog/ResponseBlog.jsx';
import Spinner from 'react-bootstrap/Spinner';

export default function GetBlog() {

    const [id, setId] = useState("");
    const [data, setData] = useState([]);
    const label = "Send Request";
    const {token} = useContext(StorageContext);
    const [spin, setSpin] = useState(false);

    const fetchFncGet = async ()=>{
        setSpin(true);
        try{
            let response = await fetch("//localhost:3001/blog/post",
            {
                method:"GET",
                headers:{"Authorization":"Bearer " + token},
            })
            if(response.ok){
            setSpin(false);
            console.log("Fetch blog GET Riuscita.");
            let json = await response.json();
            setData(json);
            }else{
            setSpin(false);
            console.log("Fetch blog GET Fallita.");
            }
            
        }catch(err){
            setSpin(false);
            console.error(err);
        }
    }

    const fetchFncGetId = async ()=>{
        try{
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/blog/post/${id}`, {headers:{"Authorization":"Bearer " + token}})

            if(response.ok){
                console.log("Fetch Riuscita.");
                let json = [await response.json()];
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
    <Container fluid className='relative mb-5 pb-5'>
      <FormBlog setId ={setId} />
      <MultipleButton content={label} id={id} btnFnc={fetchFncGetId} />
      <div className='d-flex justify-content-center'>
        <Spinner className={spin ? "" : "d-none"} animation="border" variant="primary" />
      </div>
      {data && <ResponseBlog content={data} refresh={fetchFncGet} />}
    </Container>
  )
}
