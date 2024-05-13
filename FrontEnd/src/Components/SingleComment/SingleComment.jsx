import React, { useState, useContext, useEffect } from 'react';
import { StorageContext } from '../../Context/StorageContextProvider';
import './SingleComment.css';

export default function PopUpPostDetails({singleComment, sComment, setSComment}) {

    const [author, setAuthor] = useState([]);
    
    const {token} = useContext(StorageContext);

    const fetchGetAuthor = async ()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/authors/${singleComment.author}`,
                {
                method:"GET",
                headers:{"Authorization":"Bearer " + token}
                }
            )

            if(response.ok){
                let json = await response.json();
                console.log("Fetch Author Riuscita!", response);
                console.log("Author Json = ", json);
                setAuthor(json);
                setSComment(true);
            }else{
                console.log("Fetch Author Fallita!");
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(sComment){
            fetchGetAuthor();
        }
    }, [singleComment]);
      

    return (
        <div className={`popUp-src-singleComment ${sComment ? "" : "d-none"}`}>
            <div className='topBar-singleComment justify-content-between'>
                <p className='singleComment-id text-center mb-0 w-100'><b>ID: </b>{singleComment._id}</p>
                <button type='button' onClick={()=>{setSComment(false); setAuthor([])}} className='singleComment-cls mx-1'>X</button>
            </div>
            <div className='d-flex align-items-center'>
                <img height={"40px"} src={author?.avatar} alt="authorImg" className='rounded-circle m-2' />
                <p className='author ms-2 mb-0'>{author?.name} {author?.surname}:</p>
            </div>
            <div className='description'>
                <p className='mb-0'>{singleComment.description}</p>
            </div>

        </div>
  )
}
