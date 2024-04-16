import React, { useEffect, useState } from 'react';
import Form from '../../../Components/FormAuthor/FormAuthor.jsx';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton.jsx';
import Response from '../../../Components/ResponseAuthor/ResponseAuthor.jsx';
import { useParams } from 'react-router-dom';

export default function Put() {
  // setId, setName, setSurname, setDate, setEmail, setImg, id, name, surname, email, date, avatar
  const label = "Edit"
  const {id} = useParams();
  const [objId, setObjId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const fetchFncUpdate = async ()=>{
    try{
      const response = await fetch(`//localhost:3001/api/authors/${id}`, {method:"GET"})

      if(response.ok){
        console.log("Fetch Riuscita!");
        const json = await response.json();
        console.log(json);
        setObjId(json._id);
        setAvatar(json.avatar);
        setDate(json.dateOfBirth);
        setName(json.name);
        setSurname(json.surname);
        setEmail(json.email);
      }else{
        console.log("Fetch Fallita.");
      }
    }catch (err){
      console.error(err);
    }
  }

  const fetchFncPut = async ()=>{
    try{

      const updateAuthor ={
        avatar: avatar,
        name: name, 
        surname: surname, 
        dateOfBirth: date, 
        email: email,
      }

      const response = await fetch(`//localhost:3001/api/authors/${id}`,
        {
          method:"PUT",
          body: JSON.stringify(updateAuthor),
          headers: {"Content-type":"application/json;charset=UTF-8"}      
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

  useEffect(()=>{
    fetchFncUpdate();
  }, []);


  
  return (
    <>
      <Form
        objId={objId}
        setObjId={setObjId}
        name={name}
        setName={setName}
        surname={surname}
        setSurname={setSurname}
        email={email}
        setEmail={setEmail}
        date={date}
        setDate={setDate}
        avatar={avatar}
        setImg={setAvatar}
        />
      <MultipleButton content={label} btnFnc={fetchFncPut} />
      <Response content={[]}/>
    </>
  )
}
