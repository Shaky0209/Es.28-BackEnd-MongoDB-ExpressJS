import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import MultipleButton from '../../Components/MultilpleButton/MultipleButton';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

export default function TextControlsExample() {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [birth, setBirth] = useState("");
    const [link, setLink] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const navigate = useNavigate();
    const label = "Register";

    const fetchRegister = async ()=>{

        if(password === rePassword){
            try{
                const body ={
                    name: name,
                    surname: surname, 
                    email: email,
                    password: password,
                    dateOfBirth: birth,
                    avatar: link,
                    posts:[],
                }
                const response = await fetch(`http://localhost:3001/log/register`,
                    {
                        method:"POST",
                        body: JSON.stringify(body),
                        headers:{"Content-type":"application/json;charset=UTF-8"},
                    }
                )

                if(response.ok){
                    console.log("Registrazione Riuscita!");
                    navigate("/");
                    alert("La tua registrazione è avvenuta con successo! Procedi con il login!");
                }else{
                    console.log("Registrazione Fallita!");
                    console.log("response = ", response);
                }

            }catch(err){
                console.log(err);
            }
            
        }else{
            alert("I due campi 'Password' e 'Riscrivi password' non coincidono! Compila i campi correttamente!");
        }
    }

  return (
    <Container fluid>
        <Container className="register-form mt-3">
            <h2 className='text-center mb-3'>Compila il form di Registrazione</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control
                    className='text-center'
                    type="text"
                    placeholder="Nome"
                    onChange={(event)=>{setName(event.target.value)}}
                />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                    className='text-center'
                    type="text"
                    placeholder="Cognome"
                    onChange={(event)=>{setSurname(event.target.value)}}
                />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                    className='text-center'
                    type="text"
                    placeholder="Data di nascita"
                    onChange={(event)=>{setBirth(event.target.value)}}
                />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                    className='text-center'
                    type="text"
                    placeholder="Link della tua immagine"
                    onChange={(event)=>{setLink(event.target.value)}}
                />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                    className='text-center'
                    type="email"
                    placeholder="e-mail"
                    onChange={(event)=>{setEmail(event.target.value)}}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                    className='text-center'
                    type="password"
                    placeholder="Password"
                    onChange={(event)=>{setPassword(event.target.value)}}
                />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                    className='text-center'
                    type="password"
                    placeholder="Ripeti password"
                    onChange={(event)=>{setRePassword(event.target.value)}}
                />
                </Form.Group>
            </Form>
            <MultipleButton content={label} btnFnc={()=>{fetchRegister()}} />
        </Container>
    </Container>
  );
}

