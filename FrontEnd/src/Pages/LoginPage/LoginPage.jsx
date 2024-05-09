import React, { useState, useContext} from 'react';
import { StorageContext } from '../../Context/StorageContextProvider.jsx';
import { UserContext } from '../../Context/UserContextProvider.jsx';
import { Container } from 'react-bootstrap';
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
        const response = await fetch(`http://localhost:3001/log/login`,
            {
                method:"POST",
                body: JSON.stringify(body),
                headers:{"Content-type":"application/json;charset=UTF-8"},
            }
        )
        if(response.ok){
            const userLogged = await response.json()
            console.log("User Logged = ", userLogged);
            console.log("SetUser = ", userLogged.user._id);
            localStorage.setItem("token",userLogged.token)
            localStorage.setItem("user",userLogged.user._id)
            setToken(userLogged.token);
            setUser(userLogged.user._id);
            navigate(`/api/authors/GET/`);
            console.log("Fetch LogIn Riuscita!");
        }else{
            console.log("Fetch LogIn Fallita!");
            alert("Password e/o nome utente errati, riprova...");
        }
    }

  return (
    <Container fluid style={{height:"80vh"}} className='d-flex justify-contente-center align-items-center'>
        <Container style={{width:"50vw"}}>
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
            </Form>
        </Container>
    </Container>
  );
}

