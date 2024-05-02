import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import MultipleButton from '../MultilpleButton/MultipleButton';
import './PostComment.css';

export default function PostComment({author, description, _id, refresh}) {

    const [user, setUser] = useState();
    const [editPost, setEditPost] = useState(false);
    const [value, setValue] = useState("");
    const label = "Edit Comment";
    const {id} = useParams();
    // let count = 0;

    const fetchGetAuth = async ()=>{
        try{
            const response = await fetch(`//localhost:3001/api/authors/${author}`, {method:"GET"})
            let json = await response.json();
            if(response.ok){
                setUser(json);
                console.log("Fetch Get Author OK!");
            }else{
                console.log("Fetch Get Author KO!");
            }
        }catch(err){
            console.error(err);
        }
    }

    const fetchEditComment = async ()=>{
        try{

            const body = {
                author: author,
                description: value,
                _id: _id                
            };

            const response = await fetch(`//localhost:3001/blog/post/${id}/comments/${_id}`, 
            {
                method:"PUT",
                body: JSON.stringify(body),
                headers: {"Content-type":"application/json;charset=UTF-8"}, 
            },
        )
        if(response.ok){
            console.log("Commento modificato correttamente!");
            refresh();
            setEditPost(false);
        }else{
            console.log("Il Commento non è stato modificato correttamente!");
        }
        }catch(err){
          console.log(err);
        }
      }

      const fetchDeleteComment = async ()=>{
        try{
            console.log("id=",id);
            console.log("_id=",_id);

            const response = await fetch(`//localhost:3001/blog/post/${id}/comments/${_id}`, {method:"DELETE"})
            if(response.ok){
                console.log("Oggetto rimosso!");
                refresh();
            }else{
                console.log("Errore: L'oggetto non è stato rimosso!");
            }
        }catch(err){
          console.log(err);
        }
      }

    useEffect(()=>{
        fetchGetAuth();
    }, []);
    
  return (
    <>
    <div className='comment p-2 mb-2'>
        <img src={user && user.avatar} className='userImg rounded-circle me-2' alt="UserImg" />
        <span className='user' ><b>{user && user.name} {user && user.surname}:</b></span>
        <p className='text-center pt-2' >{description}</p>
        <button 
            type='button'
            className='post-btn'
            onClick={()=>{
                setValue(description);
                setEditPost(true);
                }
            }
            >
                Edit
            </button>
            <button className='post-btn' onClick={()=>{fetchDeleteComment(); refresh()}}>Delete</button>
    </div>

    <div className={`postEdit ${editPost ? "" : "d-none"}`}>
        <div className='top-bar-edit d-flex align-items-center'>
            <p className='text-center w-100 m-0'>Edit your Comment</p>
            <button type='button' className="btn-close-edit m-1" onClick={()=>setEditPost(!editPost)}>X</button>
        </div>
        <div className='p-2'>
            {user && <div>
                <img src={user.avatar} height={"40px"} className='rounded-circle m-1' alt="author" />
                <span className='user'>{user.name} {user.surname}:</span>
            </div>}
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={value}
                        onChange={(event)=>{setValue(event.target.value)}}
                        />
                </Form.Group>
            </Form>
            <MultipleButton content={label} btnFnc={()=>fetchEditComment()} />
        </div>
    </div>
    </>
  )
}
