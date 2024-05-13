import React, { useState, useContext} from 'react';
import { StorageContext } from '../../Context/StorageContextProvider.jsx';
import { UserContext } from '../../Context/UserContextProvider.jsx';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import MultipleButton from '../../Components/MultilpleButton/MultipleButton';

export default function LoginPage() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setToken} = useContext(StorageContext);
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const label = "Enter";
    
    const fetchLogin = async ()=>{

        let body = {email: email, password: password}

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/log/login`,
            {
                method:"POST",
                body: JSON.stringify(body),
                headers:{"Content-type":"application/json;charset=UTF-8"},
            }
        )
        if(response.ok){
            const userLogged = await response.json()
            localStorage.setItem("token",userLogged.token)
            localStorage.setItem("user",userLogged.user._id)
            setToken(userLogged.token);
            setUser(userLogged.user._id);
            navigate(`/`);
            console.log("Fetch LogIn Riuscita!");
        }else{
            console.log("Fetch LogIn Fallita!");
            alert("Password e/o nome utente errati, riprova...");
        }
    }

    const googleLogIn = (event)=>{        
        event.preventDefault();
        const link = process.env.REACT_APP_SERVER_URL_G_LOGIN;
        window.open(link, "_self");
    }

    
  return (
    <Container fluid style={{height:"91vh"}} className='d-flex justify-contente-center align-items-center'>
        <Container style={{width:"50vw"}}>
            <h4 className='text-center mb-5'>Inserisci i tuoi dati di accesso!</h4>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control
                        className='text-center mb-3'
                        type="text"
                        onChange={(event)=>{setEmail(event.target.value)}}
                        placeholder="e-mail"
                    />
                    <Form.Control 
                        className='text-center'
                        type="password"
                        onChange={(event)=>{setPassword(event.target.value)}}
                        placeholder="Password"
                    />
                </Form.Group>
                <MultipleButton content={label} btnFnc={()=>fetchLogin()}/> 
                <div className='d-flex flex-column align-items-center'>
                    <p>Oppure...</p>
                    <Button type='button' onClick={(event)=>googleLogIn(event)}>
                        <img  style={{height:"60px", width:"80px"}} className='me-2' src="https://i.pinimg.com/736x/19/74/89/1974895dcb39192c99c0156e80494d3e.jpg" alt="googleLogin" />
                        Accedi con Google!
                    </Button>
                </div>
            </Form>
           </Container>
        </Container>
  );
}

