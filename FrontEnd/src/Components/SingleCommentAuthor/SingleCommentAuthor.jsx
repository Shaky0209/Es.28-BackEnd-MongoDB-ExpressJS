import React, { useState, useContext, useEffect } from 'react';
import { StorageContext } from '../../Context/StorageContextProvider';


export default function PopUpPostDetails({objId, sComment, setSComment}) {

    const [author, setAuthor] = useState([]);
    const [userId, setUserId] = useState("");
    const [description, setDescription] = useState("");
    const {token} = useContext(StorageContext);
    
    const fetchGetPost = async ()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/author/comments/post/${objId}`, 
            {
                method:"GET",
                headers:{"Authorization":"Bearer " + token}, 
            })

            if(response.ok){
                console.log("Fetch Get Post Riuscita");
                const json = await response.json();
                console.log("POST = ", json);
                setUserId(json.user)
                setDescription(json.description)
                
            }
        }catch(err){
            console.log(err)
        }
    }

    const fetchGetAuthor= async ()=>{
        
        try{
            
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/authors/${userId}`,
                {
                    method:"GET",
                    headers:{"Authorization":"Bearer " + token},
                }
            )

            if(response.ok){
                console.log("Fetch Get Author Riuscita");
                let json = await response.json();
                console.log("setAuthor = ", json);
                setAuthor(json);
            }else{
                console.log("Fetch Get Author Fallita");
            }
            
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(objId){
            fetchGetPost();
        }
    }, [objId]);

    useEffect(()=>{
        if(sComment){
            fetchGetAuthor();
        }
    }, [sComment])

    return (
        <div className={`popUp-src-singleComment ${sComment ? "" : "d-none"}`}>
            <div className='topBar-singleComment justify-content-between'>
                <p className='singleComment-id text-center mb-0 w-100'><b>ID: </b>{objId}</p>
                <button
                    type='button'
                    onClick={()=>{
                        setSComment(false);
                    }}
                    className='singleComment-cls mx-1'>X</button>
            </div>
            <div className='d-flex align-items-center'>
                <img height={"40px"} src={author && author.avatar} alt="authorImg" className='rounded-circle m-2' />
                <p className='author ms-2 mb-0'>{author && author.name} {author && author.surname}:</p>
            </div>
            <div className='description'>
                <p className='mb-0'>{description}</p>
            </div>
        </div>
  )
}
