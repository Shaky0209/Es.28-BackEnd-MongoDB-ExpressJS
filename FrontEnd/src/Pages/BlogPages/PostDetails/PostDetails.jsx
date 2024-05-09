import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { StorageContext } from '../../../Context/StorageContextProvider';
import { UserContext } from '../../../Context/UserContextProvider';
import Form from 'react-bootstrap/Form';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton';
import PostComment from '../../../Components/PostComment/PostComment.jsx';

const label = "Add Comment";
let count = 0;

export default function PostDetails() {

    const {id} = useParams();
    const [data, setData] = useState([]);
    const [comment, setComment] = useState("");
    const [allComments, setAllComments]= useState([]);

    const {token} = useContext(StorageContext);
    const {user} = useContext(UserContext);

    const fetchGetObj = async ()=>{
        try{
            const response = await fetch(`//localhost:3001/blog/post/${id}`,
            {
              method:"GET",
              headers:{"Authorization":"Bearer " + token},
            });

            if(response.ok){
            let json = await response.json();
            setData(json);
            fetchGetComments();
            }

        }catch(err){
            console.log(err);
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
            headers:{"Content-type":"application/json;charset=UTF-8","Authorization":"Bearer " + token},
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
          const response = await fetch(`//localhost:3001/blog/post/${id}/comments/`,{headers:{"Authorization":"Bearer " + token}});
          let json = await response.json();
          setAllComments(json);
      }catch(err){
        console.error(err);
      }
    }
  
  useEffect(()=>{
    fetchGetObj();
  }, []);    

  return (
    <Container fluid className='p-3'>
      <Row>
        {data.author && <Col md={6}>
          <div className='d-flex flex-column justify-content-between border border-1 rounded p-2'>
            <div className=''>
              <div className='post-img'>
                <img height={"auto"} style={{width:"100%"}} src={data.cover} alt="cover" />
              </div>
              <p className='mb-0'><b>Category:</b> {data.category}</p>
              <p className='mb-0'><b>Title:</b> {data.title}</p>
              <img height={"auto"} style={{width:"50px"}} src={data.author.avatar} alt="avatar" />
              <p className='mb-0'><b>Author:</b> {data.name}</p>
              <p className='mb-0'><b>TimeUnit:</b> {data.readTime.unit}</p>
              <p className='mb-0'><b>RecTime:</b> {data.readTime.value}</p>
              <p className="fw-bold text-center mt-3 mb-1">Message:</p>
              <p className='mb-0'>{data.content}</p>
              <p className='id-style mb-1 border border-1 my-3'><b>ID: </b>{id}</p>
            </div>
          </div>
        </Col>}
        <Col>
          <Container fluid className='border border-1 rounded p-2 h-100'>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Comment:</Form.Label>
                <Form.Control
                  onChange={(event)=> setComment(event.target.value)}
                  as="textarea"
                  rows={3}
                  />
              </Form.Group>
            </Form>
            <MultipleButton content={label} btnFnc={()=>{fetchAddComment(); count++;}} />
            <Container fluid className='border border-1 rounded p-2'>
              {allComments.map((el)=>{
                const {author, description, _id} = el;

                return  <PostComment
                          key={_id}
                          author={author}
                          description={description}
                          _id={_id}
                          refresh={()=>fetchGetObj()}
                        />
              })}
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}