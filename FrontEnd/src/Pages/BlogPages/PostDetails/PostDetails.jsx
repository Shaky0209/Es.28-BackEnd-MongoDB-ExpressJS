import React, { useEffect, useState, useContext } from 'react';
import { Container, InputGroup, Row, Col } from 'react-bootstrap';
import { StorageContext } from '../../../Context/StorageContextProvider';
import { UserContext } from '../../../Context/UserContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import MultipleButton from '../../../Components/MultilpleButton/MultipleButton';
import PostComment from '../../../Components/PostComment/PostComment.jsx';
import Form from 'react-bootstrap/Form';
import SingleComment from '../../../Components/SingleComment/SingleComment.jsx';
import './PostDetails.css';

const label = "Add Comment";
let count = 0;

export default function PostDetails() {

    const {id} = useParams();
    const [objId, setObjId] = useState("");
    const [data, setData] = useState([]);
    const [sComment, setSComment] = useState(false);
    const [comment, setComment] = useState("");
    const [singleComment, setSingleComment] = useState("");
    const [allComments, setAllComments]= useState([]);

    const {token} = useContext(StorageContext);
    const {user} = useContext(UserContext);

    const fetchGetObj = async ()=>{
      try{
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/blog/post/${id}`,
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



    const fetchGetSingleComment = async ()=>{
      try{
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/blog/post/${id}/comments/${objId}`,
          {
            method:"GET",
            headers:{"Authorization":"Bearer " + token}
          })

        if(response.ok){
          console.log("Fetch Single Comment Riuscita!");
          let json = await response.json();
          setSingleComment(json);
          setSComment(true);
        }else{
          console.log("Fetch Single Comment Fallita!");
        }
      }catch(err){
        console.log(err);
      }
    }
  
  useEffect(()=>{
    fetchGetObj();
  }, []);    

  return (
    <div className='dts-container'>
      <Container fluid className='p-3'>
        <SingleComment
          singleComment={singleComment}
          sComment={sComment}
          setSComment={setSComment}
        />
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
          <Col className='mt-2 mt-md-0'>
            <Container fluid className='border border-1 rounded p-2 h-100'>
              <Form>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faBarcode} /></InputGroup.Text>
                    <Form.Control
                    value={objId}
                    onChange={(event)=>setObjId(event.target.value)}
                    placeholder="Search by Comment ID"
                    aria-describedby="basic-addon1"
                    />
                    <button type='button' className="search-byId" onClick={()=>fetchGetSingleComment()}>Search</button>
                </InputGroup>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Comment:</Form.Label>
                  <Form.Control
                    onChange={(event)=>setComment(event.target.value)}
                    as="textarea"
                    rows={3}
                    />
                </Form.Group>
              </Form>
              <MultipleButton content={label} btnFnc={()=>{fetchAddComment(); count++;}} />
              <Container fluid className='p-2'>
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
    </div>
  )
}