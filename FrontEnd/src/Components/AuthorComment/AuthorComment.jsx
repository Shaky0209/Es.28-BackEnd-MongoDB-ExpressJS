import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import {Form} from 'react-bootstrap';
import { StorageContext } from '../../Context/StorageContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import MultipleButton from '../MultilpleButton/MultipleButton';


export default function AuthorComment ({postId, refresh}) {
    
    const [post, setPost] = useState([]);
    const [value, setValue] = useState("");
    // const [blogger, setBlogger] = useState("");
    const [editPost, setEditPost] = useState(false);
    const [win, setWin] = useState("");
    const [author, setAuthor] = useState({});
    const {id} = useParams();
    const label = "Edit Comment";
    const {token} = useContext(StorageContext);
    const {user} = useContext(UserContext);
    console.log("postId = ", postId);
    

    const fetchPost = async()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/author/comments/post/${postId}`,
            {
                method:"GET",
                headers:{"Authorization":"Bearer " + token},
            });
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
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/authors/${post.user}`,
            {
                method:"GET",
                headers:{"Authorization":"Bearer " + token},
            })
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

            const response = await fetch(`//localhost:3001/author/comments/edit/post/${postId}`, 
            {
                method:"PUT",
                body: JSON.stringify(body),
                headers: {"Content-type":"application/json;charset=UTF-8", "Authorization":"Bearer " + token}, 
            },
        )
        if(response.ok){
            let json = await response.json();
            console.log("Edit Comment json = ", json);
            console.log("Fetch Edit Comment Riuscita!");
            setWin(false);
            fetchPost();         
        }else{
            setWin(false)
            console.log("Fetch Edit Comment Fallita!");
            alert("La modifica non è andata a buon fine!");
        }
        }catch(err){
          console.log(err);
        }
      }

    const fetchDeleteComment = async ()=>{
        try{
            console.log("post.user=",post.user);
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/author/comments/authId/${id}/commentId/${postId}`,
            {
                method:"DELETE",
                headers:{"Authorization":"Bearer " + token},
            })
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
        console.log("PostId Fetch = ", postId);
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
        <div className='d-flex justify-content-between'>
            <span className='comment-id mb-0'><b>ID: </b>{post._id}</span>
            <div>
                {(user===post.user) && <button 
                    type='button'
                    className='post-btn'
                    onClick={()=>{
                        setValue(post.description);
                        setWin(true);
                        }
                    }
                    >
                        Edit
                    </button>}
                    {(user===post.user) && <button className='post-btn' onClick={()=>fetchDeleteComment()}>Delete</button>}
                    <div>
                        {console.log("user, author._id = ", user, author._id)}
                            {user===author._id ?? <button 
                                type='button'
                                className='post-btn'
                                onClick={()=>{
                                    setValue();
                                    setEditPost(true);
                                    }
                                }
                            >
                                Edit
                            </button>}
                            {user===author._id ?? <button className='post-btn' onClick={()=>{fetchDeleteComment(); refresh()}}>Delete</button>}
                        </div>
                    </div>
                </div>
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
            <MultipleButton content={label} btnFnc={()=>{fetchEditComment();}} />
        </div>
    </div>
    </>
  )
}
