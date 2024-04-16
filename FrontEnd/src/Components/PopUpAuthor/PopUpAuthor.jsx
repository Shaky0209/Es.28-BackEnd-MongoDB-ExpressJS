import React from 'react';
import './PopUpAuthor.css';

export default function PopUpAuthor({popUp, setPopUp, newObj}) {

    const {avatar, name, surname, email, dateOfBirth} = newObj;
    
    return (
        <div className={`pop-up p-2 ${popUp ? "" : "d-none"}`}>
            <div className='d-flex justify-content-end'>
                <p className='card-write text-center w-100'>This is your profile</p>
                <button className='button-close' onClick={()=>setPopUp(!popUp)} >X</button>
            </div>
            <div className='my-1'>
                <img height={"auto"} style={{width:"100%"}} src={avatar} alt="img" />
                <p className='card-write m-0 ps-2 pt-3'><b>Name:</b> {name}</p>
                <p className='card-write m-0 ps-2'><b>Surname:</b> {surname}</p>
                <p className='card-write m-0 ps-2'><b>e-mail:</b> {email}</p>
                <p className='card-write m-0 ps-2'><b>Birth:</b> {dateOfBirth}</p>
            </div>
        </div>
    )
}