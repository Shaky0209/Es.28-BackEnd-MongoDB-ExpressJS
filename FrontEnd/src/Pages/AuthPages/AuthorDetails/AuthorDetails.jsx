import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton.jsx';
import AuthorComment from '../../../Components/AuthorComment/AuthorComment.jsx';


const label = "Add Comment";

export default function AuthorDetails() {

    const {id} = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState("");
    const [comment, setComment] = useState("");
    const [allComments, setAllComments]= useState([]);
    const {avatar, name, surname, dateOfBirth, email, _id} = data;

    const fetchGetAuthor = async ()=>{
        try{
            const response = await fetch(`//localhost:3001/api/authors/${id}`, {method:"GET"})
            let json = await response.json();
            console.log("json = ", json);
            setData(json);
        }catch(err){
            console.log(err);
        }
    }

    const fetchGetComments = async ()=>{
        try{
            const response = await fetch(`//localhost:3001/api/authors/${id}/comments/`)
            let json = await response.json();
            console.log("posts = ", json);
            setAllComments(json);
        }catch(err){
          console.log(err);
        }
      }

    useEffect(()=>{
        fetchGetAuthor();
        fetchGetComments();
    }, []);

  return (
    <Container fluid className='p-3'>
        <Row>
            <Col md={6}>
            <div className='d-flex flex-column justify-content-between border border-1 rounded p-2 h-100'>
                <img src={avatar} alt="avatar" style={{width:"100%"}} />
                <p className='mb-0'><b>Name:</b> {name} {surname}</p>
                <p className='mb-0'><b>Birth:</b> {dateOfBirth}</p>
                <p className='mb-0'><b>e-mail:</b> {email}</p>
                <p className='id-style border border-1'><b>ID:</b> {_id}</p>
            </div>
            </Col>
            <Col>
            <Container fluid className='border border-1 rounded p-2 h-100'>
                <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Author ID:</Form.Label>
                    <Form.Control
                    onChange={(event)=> setUser(event.target.value)}
                    type="email"
                    placeholder="Example: 6616a584812a0287e7dc95bb"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control
                    onChange={(event)=> setComment(event.target.value)}
                    as="textarea"
                    rows={3}
                    />
                </Form.Group>
                </Form>
                <MultipleButton content={label} btnFnc={""} />
                <Container fluid className='border border-1 rounded p-2'>
                    {allComments.map((el)=>{
                        return  <AuthorComment key={el} id={el} />
                    })}
                </Container>
            </Container>
            </Col>
        </Row>
    </Container>
  )
}
