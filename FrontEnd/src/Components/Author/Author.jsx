import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Author.css';


export default function Author({avatar, date, email, name, surname, id, refresh}) {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const fetchFncDel = async () =>{
    try{
      const response = await  fetch(`//localhost:3001/api/authors/${id}`, {method: "DELETE"})
    if(response.ok){
      console.log("Fetch Delete Riuscita.");
      setShow(!show);
      refresh();     
    }else{
      console.log("Fetch Delete Fallita.");
    }

    }catch (err){
      console.error(err);
    }
  }

  return (
    <>
      <div className='d-flex flex-column justify-content-between mb-3 border border-1 p-2 rounded h-100'>
          <div>
            <div className='author-img'>
              <img src={avatar} alt="avatar" height={"auto"} style={{width:"100%"}}/>
              <button type='button' className='patch-btn' onClick={()=>navigate(`/api/authors/${id}/avatar`)}>Edit</button>
            </div>
            <p className='p mb-1'>{name}</p>
            <p className='p mb-1'>{surname}</p>
            <p className='p mb-1'>{date}</p>
            <p className='p mb-1'>{email}</p>
            <p className='id-style mb-1 border border-1'><b>ID: </b>{id}</p>
          </div>        
          <div>
            <button className='card-btn' type='button' onClick={()=>navigate(`/api/authors/PUT/${id}`)}>Edit</button>
            <button onClick={()=> setShow(!show)} className='card-btn' type='button'>Delete</button>
          </div>
          <div className={`custom-modal ${show ? "" : "d-none"}`}>
            <div className='d-flex justify-content-end m-2'>
              <button onClick={()=> setShow(!show)} className='card-btn' type='button'>X</button>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <b className='p-5'>Are you sure to delete {name} {surname}?</b>
              <div>
                <button onClick={()=> fetchFncDel()} className='card-btn delete-btn'>Delete</button>
                <button onClick={()=> setShow(!show)} className='card-btn'>Abort</button>
              </div>
            </div>
          </div>
      </div>
  </>
  )
}
