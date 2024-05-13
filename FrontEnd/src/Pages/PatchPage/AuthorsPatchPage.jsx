import React, { useState, useContext } from 'react';
import { InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faImagePortrait} from '@fortawesome/free-solid-svg-icons';
import { StorageContext } from '../../Context/StorageContextProvider';
import MultipleButton from '../../Components/MultilpleButton/MultipleButton';
import './AuthorsPatchPage.css';

export default function AuthorsPatchPage() {

    const label = 'Edit Avatar';
    const {id} = useParams();
    const [avatar, setAvatar] = useState(null);
    const {token} = useContext(StorageContext);

    const fetchPatchFile = async ()=>{

      const body = new FormData();
      body.append('avatar', avatar);
      try{
        const response = await fetch(`//localhost:3001/api/authors/${id}/file/avatar`, 
        {
          method:"PATCH",
          body: body,
          headers:{"Authorization":"Bearer " + token},
        })  

      if(response.ok){
        console.log("Fetch PATCH file Riuscita.");
        alert("La modifica è andata a buon fine.");
      }else{
          console.log("Fetch PATCH file Fallita.");
          alert("La modifica NON è andata a buon fine.");
        }
      }catch(err){
        console.error(err);
      }
    }

    const fetchPatchLink = async ()=>{
      try{
  
        const body = {avatar: avatar};
  
        const response = await fetch(`//localhost:3001/api/authors/${id}/link/avatar`,
          {
            method:"PATCH",
            body: JSON.stringify(body),
            headers: {"Content-type":"application/json;charset=UTF-8","Authorization":"Bearer " + localStorage.getItem("token")},
          }
        )
  
        if(response.ok){
          console.log("Fetch Riuscita.");
          alert("I dati sono stati modificati correttamente");
        }else{
          console.log("Fetch Fallita.");
          alert("La tua modifica non è andata a buon fine.");
        }
  
      }catch(err){
        console.error(err);
      }
    }

  return (
    <>
    <Container fluid className='form-style d-flex flex-column mt-2'>
      <Form.Label className='mb-0'>Edit with a file:</Form.Label>
      <Container fluid className='d-flex align-items-center p-0'>
        <InputGroup className='' style={{height:"40px"}}>
          <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faImagePortrait} /></InputGroup.Text>
          <Form.Control
          type='file'
          onChange={(event)=>setAvatar(event.target.files[0])}
          aria-describedby="basic-addon1"
          />
        </InputGroup>
        <MultipleButton content={label} btnFnc={fetchPatchFile}/>
      </Container>
    </Container>
    <Container fluid className='form-style d-flex flex-column'>
      <Form.Label className='mb-0'>Edit with a link:</Form.Label>
      <Container fluid className='d-flex align-items-center p-0'>
        <InputGroup className='' style={{height:"40px"}}>
          <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faImagePortrait} /></InputGroup.Text>
          <Form.Control
          onChange={(event)=>setAvatar(event.target.value)}
          placeholder="Avatar"
          aria-describedby="basic-addon1"
          />
        </InputGroup>
        <MultipleButton content={label} btnFnc={fetchPatchLink}/>
      </Container>
    </Container>
    <div className="space"></div>
    </>
  )
}
