import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton.jsx';
import AuthorComment from '../../../Components/AuthorComment/AuthorComment.jsx';



export default function AuthorDetails() {
    
    const {id} = useParams();
    const [data, setData] = useState({});
    const [user, setUser] = useState("");
    const [comment, setComment] = useState("");
    const [allComments, setAllComments]= useState([]);
    
    const label = "Add Comment";
    let count = 0;

    const fetchGetAuthor = async ()=>{
        try{
            const response = await fetch(`//localhost:3001/api/authors/${id}`, {method:"GET"})
            let json = await response.json();
            if(response.ok){
                console.log("Fetch Get Author Riuscita!");
                console.log("GetAuthor = ", await json);
                setData(json);
                fetchGetComments();
            }else{
                console.log("Fetch Get Author fallita! ", json, "Status = ", response.status);
            }
        }catch(err){
            console.log(err);
        }
    }

    const fetchGetComments = async ()=>{
        console.log("FetchGetComments!");
        try{
            const response = await fetch(`http://localhost:3001/api/authors/${id}/comments/`);
            let json = await response.json();
            console.log("GetComments = ", json);
            setAllComments(json);
        }catch(err){
          console.log(err);
        }
    };

    const fetchAddComment = async ()=>{

        const body = {author: user, description: comment};
        console.log("body=",body);
  
        try{
          const response = await fetch(`//localhost:3001/author/comments/post/${id}`,
            {
              method:"POST",
              body: JSON.stringify(body),
              headers:{"Content-type":"application/json;charset=UTF-8"},
            })
  
            if(response.ok){
                console.log("response Add Comment= ", response);
                console.log("Fetch Add Comment OK!");
                fetchGetComments();
            }else{
                console.log("Fetch Add Comment KO!");
            }

            fetchGetComments();

        }catch(err){
          console.error(err);
        }
      };

    useEffect(()=>{
        fetchGetAuthor();
    }, []);

    return (
        <Container fluid className='p-3'>
            <Row>
                <Col md={6}>
                    <div className='d-flex flex-column justify-content-between border border-1 rounded p-2'>
                        <img src={data.avatar} alt="avatar" style={{width:"100%"}} />
                        <p className='mb-0'><b>Name:</b> {data.name} {data.surname}</p>
                        <p className='mb-0'><b>Birth:</b> {data.dateOfBirth}</p>
                        <p className='mb-0'><b>e-mail:</b> {data.email}</p>
                        <p className='id-style border border-1'><b>ID:</b> {data._id}</p>
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
                    <MultipleButton content={label} btnFnc={()=>fetchAddComment()} />
                    <Container fluid className='border border-1 rounded p-2'>
                        {allComments.map((el)=>{
                            console.log("el = ",el);
                            return  <AuthorComment key={el} id={el} refresh={()=>fetchGetComments()} />
                        })}
                    </Container>
                </Container>
                </Col>
            </Row>
        </Container>
    )
}
