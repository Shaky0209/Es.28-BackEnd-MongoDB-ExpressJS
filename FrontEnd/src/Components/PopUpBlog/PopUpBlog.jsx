import React from 'react';
import './PopUpBlog.css';

export default function PopUpBlog({newObj, popUp, setPopUp}) {
    console.log("popup newObj= ", newObj);
    const {cover, title, author, readTime, category, content } = newObj;
    // const {avatar, name} = author;
    // const {unit, value} = readTime;

    return (
        // Qui andrò a mettere "d-none" come seconda opzione per attivare e disattivare il popup
        <div className={`pop-up p-2 ${popUp ? "" : ""}`}>  
            <div className='d-flex justify-content-end'>
                <p className='card-write text-center w-100'>You posted this item</p>
                <button className='button-close' onClick={()=>setPopUp(!popUp)} >X</button>
            </div>
            <div className='my-1'>
                <img height={"auto"} style={{width:"100%"}} src={cover} alt="img" />
                <p className='card-write m-0 ps-2 pt-3'><b>Category:</b> {category}</p>
                <p className='card-write m-0 ps-2'><b>Title:</b> {title}</p>
                {/* <img height={"auto"} style={{width:"50px"}} src={author.avatar} alt="img" /> */}
                {/* <p className='card-write m-0 ps-2'><b>Author:</b> {author.name}</p> */}
                {/* <p className='card-write m-0 ps-2'><b>TimeUnit:</b> {readTime.unit}</p> */}
                {/* <p className='card-write m-0 ps-2'><b>RecTime:</b> {readTime.value}</p> */}
                {/* <p className="card-write fw-bold text-center m-0">Message:</p> */}
                {/* <p className='card-write m-0 ps-2'>{content}</p> */}
            </div>
        </div>
    )
}