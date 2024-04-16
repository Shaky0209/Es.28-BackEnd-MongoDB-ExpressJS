import React, { useState } from 'react';
import FormAuthor from '../../../Components/FormAuthor/FormAuthor.jsx';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton.jsx';
import PopUpAuthor from '../../../Components/PopUpAuthor/PopUpAuthor.jsx';

export default function Post() {

  const label= "Add Author";
  const [popUp, setPopUp] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [img, setImg] = useState("");
  const [newObj, setNewObj] = useState([]);

  const fetchFncPost = async ()=>{

    const newAuthor = {
      avatar: img,
      name: name,
      surname: surname,
      email: email,
      dateOfBirth: date,
    }

    console.log(newAuthor);
    setNewObj(newAuthor);
   
    try{
      const response = await fetch("http://localhost:3001/api/authors",
        {
        method:"POST", 
        body: JSON.stringify(newAuthor),
        headers:{"Content-type":"application/json;charset=UTF-8"},
        }
      )

      if(response.ok){
        console.log("Fetch Riuscita.")
      }else{
        console.log("Fetch Fallita.")
      }

    }catch(err){
      console.error(err);
    }
  }

  return (
    <>
      <FormAuthor
        setName={setName}
        setSurname={setSurname}
        setEmail={setEmail}
        setDate={setDate}
        setImg={setImg}
      />
      <MultipleButton
        content={label}
        btnFnc={()=>{
          fetchFncPost();
          setPopUp(!popUp);
          setName("");
          setSurname("");
          setEmail("");
          setDate("");
          setImg("");
        }
        }/>
      <PopUpAuthor popUp={popUp} setPopUp={setPopUp} newObj={newObj} />
    </>
  )
}
