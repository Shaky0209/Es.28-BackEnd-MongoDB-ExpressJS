import React, { useState, useContext, useEffect } from 'react';
import { StorageContext } from '../../../Context/StorageContextProvider';
import { UserContext } from '../../../Context/UserContextProvider.jsx';
import FormBlog from '../../../Components/FormBlog/FormBlog.jsx';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton.jsx';
import PopUpBlog from '../../../Components/PopUpBlog/PopUpBlog.jsx';


export default function PostBlog() {

  const label="Add Post";
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [post, setPost] = useState("");
  const [newObj, setNewObj] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const unit = "D/M/Y, h:m:s";
  const {token} = useContext(StorageContext);
  const {user} = useContext(UserContext);
  let date = new Date().toLocaleString();
  
  const fetchFncPost = async ()=>{

    let blogPost =  {
      author: { 
        avatar: avatar,
        name: name,
        surname:surname,
        _id: user,
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
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/blog/post`,
        {
          method:"POST",
          body: JSON.stringify(blogPost), 
          headers:{"Content-type":"application/json;charset=UTF-8","Authorization":"Bearer " + token},
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

  const fetchGetAuthor = async()=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/authors/${user}`,
      {
        method:"GET",
        headers:{"Authorization":"Bearer " + token}
      })

      if(response.ok){
        let json = await response.json();
        setAvatar(json.avatar);
        setName(json.name);
        setSurname(json.surname);
        console.log("GetAuthorPostBlog = ", json);
      }
    }catch (err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchGetAuthor();
  })

  return (
    <>
        <FormBlog
          setCover={setCover}
          setCategory={setCategory}
          setTitle={setTitle}
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