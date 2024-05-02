import React, { useEffect, useState } from 'react'

export default function AuthorComment({id}) {

    const [post, setPost] = useState([])

    const fetchPost = async()=>{
        try{
            const response = fetch(`//localhost:3001/author/comments/post/${id}`,{method:"GET"})
            if(response.ok){
                let json = await response.json();
                console.log("post = ", json);
                setPost(json);
                console.log("Fetch Autor Comment OK!");
            }else{
                console.log("Fetch Autor Comment fallita!");
            }
        }catch(err){
            console.log(err);
        }        
    };

    useEffect(()=>{
        fetchPost();
    })
  return (
    <div>{id}</div>
  )
}
