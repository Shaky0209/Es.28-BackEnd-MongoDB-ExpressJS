import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Post.css';

export default function Post({category, title, cover, timeValue, timeUnit, name, avatar, content, id, refresh }) {

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const fetchFncDelete = async ()=>{
    try{
    const response = await fetch(`//localhost:3001/blog/post/${id}`, {method:"DELETE"})
    console.log(response);
    if(response.ok){
      console.log("Fetch post PUT Riuscita.");
      refresh();
    }else{
      console.log("Fetch post PUT Fallita.");
      alert("Cancellazione Fallita.");
    }
    }catch(err){
      console.error(err)
    }
    
  }
  return (
    <div className='d-flex flex-column justify-content-between border border-1 rounded p-2 h-100'>
      <div className=''>
        <img height={"auto"} style={{width:"100%"}} src={cover} alt="cover" />
        <p className='character mb-0'><b>Category:</b> {category}</p>
        <p className='character mb-0'><b>Title:</b> {title}</p>
        <img height={"auto"} style={{width:"50px"}} src={avatar} alt="avatar" />
        <p className='character mb-0'><b>Author:</b> {name || "not found"}</p>
        <p className='character mb-0'><b>TimeUnit:</b> {timeUnit || "not found"}</p>
        <p className='character mb-0'><b>RecTime:</b> {timeValue || "not found"}</p>
        <p className="fw-bold text-center m-0">Message:</p>
        <p className='character mb-0'>{content}</p>
        <p className='id-style mb-1 border border-1'><b>ID:</b>{id}</p>
      </div>
      <div>
        <button className='card-btn' onClick={()=> navigate(`/blog/post/PUT/${id}`)} >Edit</button>
        <button className='card-btn ms-1' onClick={()=> setShow(!show)} >Delete</button>
      </div>
      <div className={`custom-modal ${show ? "" : "d-none"}`}>
        <div className='d-flex justify-content-end'>
          <button onClick={()=> setShow(!show)} className='card-btn' type='button'>X</button>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <b className='p-5'>Are you sure to delete object "{title}" of  "{name}"?</b>
          <div>
            <button onClick={()=> fetchFncDelete()} className='card-btn delete-btn'>Delete</button>
            <button onClick={()=> setShow(!show)} className='card-btn'>Abort</button>
          </div>
        </div>
      </div>
    </div>
  )
}