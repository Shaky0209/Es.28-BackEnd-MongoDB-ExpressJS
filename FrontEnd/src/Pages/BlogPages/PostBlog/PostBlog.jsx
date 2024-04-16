import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormBlog from '../../../Components/FormBlog/FormBlog.jsx';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton.jsx';
import PopUpBlog from '../../../Components/PopUpBlog/PopUpBlog.jsx';


export default function PostBlog() {

  const navigate = useNavigate();
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
  let blogPost;


// useEffect utilizzato per fare la prova trasmissione prop con oggetto creato manualmente.
 useEffect(()=>{
  console.log("Fase 1 newObj = ", newObj);
  blogPost =  {
   author: { 
     name: "Default",
     avatar: "https://i.mixes.cloud/300x300/extaudio/c/c/5/6/8dc4-f839-4fa7-8bef-328870fe8677",
   },
   category: "Default",
   content: "Default",
   cover: "https://caffescuola.files.wordpress.com/2021/03/people-5231919_1920.jpg?strip=info&w=1280",
   readTime: {
     value: `${date}`,
     unit: unit,
   },
   title: "Default",
 };
 setNewObj(blogPost);
 console.log("Fase 2 newObj = ", newObj);
}, []);
  
  
  const fetchFncPost = async ()=>{
    // Questo codice commentato implementerà la funzionalità voluta una volta scoperto il bug.

    // blogPost =  {
    //   author: { 
    //     avatar: avatar,
    //     name: name,
    //   },
    //   category: category,
    //   content: post,
    //   cover: cover,
    //   readTime: {
    //     unit: unit,
    //     value: `${date}`,
    //   },
    //   title: title,
    // };
    // setNewObj(blogPost);

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
        console.log("Fetch Blog POST Riuscita ")
        // alert("Il tuo post è stato inserito.");
        // navigate("/blog/post/GET");
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