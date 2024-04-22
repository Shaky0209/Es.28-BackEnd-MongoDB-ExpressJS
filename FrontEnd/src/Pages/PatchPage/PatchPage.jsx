import React, { useState } from 'react';
import MultipleButton from '../../Components/MultilpleButton/MultipleButton';
import { InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faImagePortrait} from '@fortawesome/free-solid-svg-icons';
import './PatchPage.css';

export default function PatchPage() {

    const label = 'Edit Avatar';
    const {id} = useParams();
    const [avatar, setAvatar] = useState(null);

    const fetchPatch = ()=>{

      const newAvatar = {avatar: avatar}
      try{
        const response = fetch(`//localhost:3001/api/authors/${id}/avatar`, 
        {
          method:"PATCH",
          body: JSON.stringify(newAvatar),
          headers: {"Content-type":"application/json;charset=UTF-8"}  
        })
        if(response.ok){
          console.log("Fetch PATCH Riuscita.");
        }else{
          console.log("Fetch PATCH Fallita.");
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
          // value={avatar}
          // onChange={(event)=>setImg(event.target.value)}
          placeholder="Avatar"
          aria-describedby="basic-addon1"
          />
        </InputGroup>
        <MultipleButton content={label} />
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
        <MultipleButton content={label} btnFnc={fetchPatch}/>
      </Container>
    </Container>
    
    </>
  )
}
