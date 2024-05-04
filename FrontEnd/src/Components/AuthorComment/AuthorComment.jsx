import React, { useEffect, useState } from 'react'
import {Form} from 'react-bootstrap';
import MultipleButton from '../MultilpleButton/MultipleButton';

export default function AuthorComment ({id, refresh}) {

    console.log("id = ", id);
    
    const [post, setPost] = useState([]);
    const [value, setValue] = useState("");
    const [win, setWin] = useState("");
    const [author, setAuthor] = useState({});
    

    const label = "Edit Comment";

    const fetchPost = async()=>{
        try{
            const response = await fetch(`http://localhost:3001/author/comments/post/${id}`,{method:"GET"});
            if(response.ok){
                let json = await response.json();
                console.log("post = ", json);
                console.log("Fetch Autor Comment OK!");
                setPost(json);
            }else{
                console.log("Fetch Autor Comment fallita!");
            }
        }catch(err){
            console.log(err);
        }        
    };

    const fetchAuthor = async ()=>{
        try{
            console.log("post.user = ", post.user);
            const response = await fetch(`http://localhost:3001/api/authors/${post.user}`, {method:"GET"})
            console.log("response = ", response);
            if(response.ok){
                let json = await response.json();
                console.log("FetchAuthor = ", json);
                setAuthor(json);
                console.log("Fetch Author Riuscita!");
            }else{
                console.log("Fetch Author Fallita!");
            }
        }catch(err){
            console.error(err);
        }
    }

    const fetchEditComment = async ()=>{
        try{
            const body = {
                description: value,
                user: post.user,
            };

            const response = await fetch(`//localhost:3001/author/comments/edit/post/${id}`, 
            {
                method:"PUT",
                body: JSON.stringify(body),
                headers: {"Content-type":"application/json;charset=UTF-8"}, 
            },
        )
        if(response.ok){
            console.log("Fetch Edit Comment Riuscita!");
            setWin(false);
            // refresh();
            window.location.reload();
        }else{
            console.log("Fetch Edit Comment Fallita!");
        }
        }catch(err){
          console.log(err);
        }
      }

    const fetchDeleteComment = async ()=>{
        try{
            console.log("post.user=",post.user);
            console.log("commentId=", id);
            const response = await fetch(`http://localhost:3001/author/comments/authId/${post.user}/commentId/${id}`, {method:"DELETE"})
            if(response.ok){
                console.log("Fetch Delete Comment Riuscita!");
                refresh();
            }else{
                console.log("Fetch Delete Comment Fallita!");
            }
        }catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        fetchPost();
    }, []);

    useEffect(()=>{
        if(post.length == 0){
            return
        };
        fetchAuthor();
    }, [post]);

    

  return (
    <>
    <div className='comment p-2 mb-2'>
        <img src={author && author.avatar} className='userImg rounded-circle me-2' alt="UserImg" />
        <span className='user'>{author && author.name} {author && author.surname}</span>
        
        <p className='text-center pt-2' >{post.description}</p>
        <button 
            type='button'
            className='post-btn'
            onClick={()=>{
                setValue(post.description);
                setWin(true);
                }
            }
            >
                Edit
            </button>
            <button className='post-btn' onClick={()=>fetchDeleteComment()}>Delete</button>
    </div>

    <div className={`postEdit ${win ? "" : "d-none"}`}>
        <div className='top-bar-edit d-flex align-items-center'>
            <p className='text-center w-100 m-0'>Edit your Comment</p>
            <button type='button' className="btn-close-edit m-1" onClick={()=>setWin(!win)}>X</button>
        </div>
        <div className='p-2'>
            <div>
                <img src={author && author.avatar} height={"40px"} className='rounded-circle m-1' alt="author" />
                <span className='user'>{author && author.name} {author && author.surname}:</span>
            </div>
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
            <MultipleButton content={label} btnFnc={()=>{fetchEditComment()}} />
        </div>
    </div>
    </>
  )
}
