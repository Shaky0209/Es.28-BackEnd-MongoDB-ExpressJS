import React, {useState, useContext} from 'react';
import { StorageContext } from '../../Context/StorageContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Post.css';

export default function Post({author, readTime, category, title, cover, content, id, refresh }) {

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {token} = useContext(StorageContext);
  const {user} = useContext(UserContext);

  const fetchFncDelete = async ()=>{
    try{
    const response = await fetch(`//localhost:3001/blog/post/${id}`,
    {
      method:"DELETE",
      headers:{"Authorization":"Bearer " + token}
    })
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
      <div>
        <div className='post-img'>
          <img height={"auto"} style={{width:"100%"}} src={cover} alt="cover" />
          {(user === author._id) && <button type='button' className='patch-btn' onClick={()=>navigate(`/blog/post/${id}/cover`)}>Edit</button>}
        </div>
        <p className='character mb-0'><b>Category:</b> {category}</p>
        <p className='character mb-0'><b>Title:</b> {title}</p>
        <img height={"auto"} style={{width:"50px"}} src={author.avatar} alt="avatar" />
        <p className='character mb-0'><b>Author:</b> {author.name} {author.surname}</p>
        <p className='character mb-0'><b>TimeUnit:</b> {readTime.unit}</p>
        <p className='character mb-0'><b>RecTime:</b> {readTime.value}</p>
        <p className="fw-bold text-center m-0">Message:</p>
        <p className='character mb-0'>{content}</p>
        <p className='id-style mb-1 border border-1'><b>ID:</b>{id}</p>
      </div>
      <div>
        <div className='pb-3'>
          <Link to = {`/blog/post/details/${id}`} >Details</Link>
        </div>
        {(user === author._id) && <button className='card-btn' onClick={()=> navigate(`/blog/post/PUT/${id}`)} >Edit</button>}
        {(user === author._id) && <button className='card-btn ms-1' onClick={()=> setShow(!show)} >Delete</button>}
      </div>
      <div className={`custom-modal ${show ? "" : "d-none"}`}>
        <div className='d-flex justify-content-end'>
          <button onClick={()=> setShow(!show)} className='card-btn' type='button'>X</button>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <b className='p-5'>Are you sure to delete object "{title}" of  "{author.name}"?</b>
          <div>
            <button onClick={()=> fetchFncDelete()} className='card-btn delete-btn'>Delete</button>
            <button onClick={()=> setShow(!show)} className='card-btn'>Abort</button>
          </div>
        </div>
      </div>
    </div>
  )
}
