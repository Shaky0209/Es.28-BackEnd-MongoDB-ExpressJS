import Form from 'react-bootstrap/Form';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton';
import PostComment from '../../../Components/PostComment/PostComment.jsx';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const label = "Add Comment";
let count = 0;

export default function PostDetails() {

    const {id} = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState("");
    const [comment, setComment] = useState("");
    const [allComments, setAllComments]= useState([]);
    const {author, category, content, cover, readTime, title} = data;

    const fetchGetObj = async ()=>{
        try{
            const response = await fetch(`//localhost:3001/blog/post/${id}`, {method:"GET"})
            let json = await response.json();
            setData(json);
        }catch(err){
            console.error(err);
        }
    }

    const fetchAddComment = async ()=>{

      const body = {author: user, description: comment};
      console.log("body=",body);

      try{
        const response = await fetch(`//localhost:3001/blog/post/${id}/comments/`,
          {
            method:"POST",
            body: JSON.stringify(body),
            headers:{"Content-type":"application/json;charset=UTF-8"},
          })

          if(response.ok){
            fetchGetObj();
            console.log("Fetch Add Comment OK!");
          }else{
            console.log("Fetch Add Comment KO!");
          }
      }catch(err){
        console.error(err);
      }
    };

    const fetchGetComments = async ()=>{
      try{
          const response = await fetch(`//localhost:3001/blog/post/${id}/comments/`)
          let json = await response.json();
          setAllComments(json);
      }catch(err){
        console.error(err);
      }
    }
  
  useEffect(()=>{
    fetchGetObj();
    fetchGetComments();
  }, [count]);    

  return (
    <Container fluid className='p-3'>
      <Row>
        {author && <Col md={6}>
          <div className='d-flex flex-column justify-content-between border border-1 rounded p-2'>
            <div className=''>
              <div className='post-img'>
                <img height={"auto"} style={{width:"100%"}} src={cover} alt="cover" />
              </div>
              <p className='mb-0'><b>Category:</b> {category}</p>
              <p className='mb-0'><b>Title:</b> {title}</p>
              <img height={"auto"} style={{width:"50px"}} src={author.avatar} alt="avatar" />
              <p className='mb-0'><b>Author:</b> {author.name}</p>
              <p className='mb-0'><b>TimeUnit:</b> {readTime.unit}</p>
              <p className='mb-0'><b>RecTime:</b> {readTime.value}</p>
              <p className="fw-bold text-center mt-3 mb-1">Message:</p>
              <p className='mb-0'>{content}</p>
              <p className='id-style mb-1 border border-1 my-3'><b>ID: </b>{id}</p>
            </div>
          </div>
        </Col>}
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
            <MultipleButton content={label} btnFnc={()=>{fetchAddComment(); count++}} />
            <Container fluid className='border border-1 rounded p-2'>
              {allComments.map((el)=>{
                const {author, description, _id} = el;

                return  <PostComment
                          key={_id}
                          author={author}
                          description={description}
                          _id={_id}
                          refresh={()=>fetchGetComments()}
                        />
              })}
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}