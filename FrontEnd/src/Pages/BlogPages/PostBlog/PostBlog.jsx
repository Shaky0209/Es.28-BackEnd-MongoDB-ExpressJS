import React, { useState } from 'react';
import FormBlog from '../../../Components/FormBlog/FormBlog.jsx';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton.jsx';
import PopUpBlog from '../../../Components/PopUpBlog/PopUpBlog.jsx';


export default function PostBlog() {

  const label="Add Post";
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [post, setPost] = useState("");
  const [newObj, setNewObj] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const unit = "D/M/Y, h:m:s";
  let date = new Date().toLocaleString();
  
  const fetchFncPost = async ()=>{

    let blogPost =  {
      author: { 
        avatar: avatar,
        name: name,
      },
      category: category,
      content: post,
      cover: cover,
      readTime: {
        unit: unit,
        value: `${date}`,
      },
      title: title,
    };     

    setNewObj(blogPost);

    try{  
      const response = await fetch('http://localhost:3001/blog/post',
        {
          method:"POST",
          body: JSON.stringify(blogPost), 
          headers:{"Content-type":"application/json;charset=UTF-8"},
        }
      )
      console.log(response);
      if(response.ok){
        setPopUp(!popUp);
        console.log("Fetch Blog POST Riuscita.")
      }
    }catch(err){
      console.error(err)
      alert("La pubblicazione del tuo post non è andata a buon fine.");
    }
  }

  return (
    <>
        <FormBlog
          setCategory ={setCategory}
          setTitle ={setTitle}
          setCover ={setCover}
          setAuthorName ={setName}
          setAuthorAvatar ={setAvatar}
          setPost ={setPost}
        />
        <MultipleButton
        content={label}
        btnFnc={()=>{
          fetchFncPost();
        }}/>
        <PopUpBlog popUp={popUp} setPopUp={setPopUp} newObj={newObj} />
    </>
  )
}