import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StorageContext } from '../../../Context/StorageContextProvider';
import FormBlog from '../../../Components/FormBlog/FormBlog.jsx';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton';

export default function PutBlog() {

  const {id} = useParams();
  const label = "Edit";
  
  const [objId, setObjId] = useState("");
  const [cover, setCover] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState(""); 
  const [post, setPost] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [timeUnit, setTimeUnit] = useState("");
  const {token, setToken} = useContext(StorageContext);
  

  const fetchFncUpdate = async ()=>{
    try{
     const response = await fetch(`//localhost:3001/blog/post/${id}`,
     {
      method:"GET",
      headers:{"Authorization":"Bearer " + token},
    })
      if (response.ok){
        console.log("Fetch Update Riuscita.");
        let json = await response.json();
        console.log(json);
        setObjId(json._id);
        setCover(json.cover);
        setCategory(json.category);
        setTitle(json.title);
        setAuthorName(json.author.name);
        setAuthorAvatar(json.author.avatar);
        setPost(json.content);
        setTimeValue(json.readTime.value);
        setTimeUnit(json.readTime.unit);
      }else{
        console.log("Fetch Update Fallita.");
      }
    }catch(err){
      console.error(err);
    }
  }

  
  const fetchFncPut = async ()=>{
    
    let postBlog = {
      author: {
        avatar: authorAvatar,
        name: authorName,
      },
      category: category,
      content: post,
      cover: cover, 
      readTime: {
        value: timeValue,
        unit: timeUnit,
      },
      title: title,
    }
    console.log("postBlog = ", postBlog);

    try{
      const response = await fetch(`//localhost:3001/blog/post/${id}`,
        {
          method:"PUT",
          body: JSON.stringify(postBlog),
          headers:{"Content-type":"application/json;charset=UTF-8","Authorization":"Bearer " + token},
        }        
      )
      if(response.ok){
        console.log("Fetch Riuscita.");
        alert("I dati sono stati modificati correttamente");
      }else{
        console.log("Fetch Fallita.");
        alert("La tua modifica non è andata a buon fine.");
      }
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchFncUpdate();
  }, []);
  
  
  
  return (
    <>
      <FormBlog
        objId={objId}
        setObjId={setObjId}
        cover={cover}
        setCover={setCover}
        category={category}
        setCategory={setCategory}
        title={title}
        setTitle={setTitle}
        authorName={authorName}
        setAuthorName={setAuthorName}
        authorAvatar={authorAvatar}
        setAuthorAvatar={setAuthorAvatar}
        post={post}
        setPost={setPost}
      />
      <MultipleButton content={label} btnFnc={()=>fetchFncPut()}/>
    </>
  )
}
