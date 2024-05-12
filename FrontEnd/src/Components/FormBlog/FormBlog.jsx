import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faHeading, faBarcode, faIcons } from '@fortawesome/free-solid-svg-icons';
import './FormBlog.css';

export default function FormBlog({  objId, setId, cover, setCover, category, setCategory, title, setTitle, post, setPost}) {
    
    const formIdEdit = ["/blog/post/GET", "/blog/post/POST"];
    const formBlog = ["/blog/post/GET"];
        
  return (
    <Container fluid  className="d-flex flex-column mt-3">
        <Container fluid className="form-style">
            <InputGroup className={`mb-3 ${!formIdEdit.includes(window.location.pathname) ? "" : "d-none"}`}>
                <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faBarcode} /></InputGroup.Text>
                <Form.Control
                value={objId}
                readOnly 
                placeholder="Object ID"
                aria-describedby="basic-addon1"
                />
            </InputGroup>
            <InputGroup className={`mb-3 ${formBlog.includes(window.location.pathname) ? "" : "d-none"}`}>
                <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faBarcode} /></InputGroup.Text>
                <Form.Control
                onChange={(event)=> setId(event.target.value)}
                placeholder="Object ID"
                aria-describedby="basic-addon1"
                />
            </InputGroup> 
        </Container>
        
        <Container fluid className={`form-style ${!(window.location.pathname.includes(formBlog)) ? "" : "d-none"}`}>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faImage} /></InputGroup.Text>
                <Form.Control
                value={cover}
                onChange={(event)=>setCover(event.target.value)}
                placeholder="Cover Image"
                aria-describedby="basic-addon1"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faIcons} /></InputGroup.Text>
                <Form.Control
                value={category}
                onChange={(event)=>setCategory(event.target.value)}
                placeholder="Category"
                aria-describedby="basic-addon1"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faHeading} /></InputGroup.Text>
                <Form.Control
                value={title}
                onChange={(event)=>setTitle(event.target.value)}
                placeholder="Title"
                aria-describedby="basic-addon1"
                />
            </InputGroup>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Write Your Post...</Form.Label>
                <Form.Control
                    value={post}
                    onChange={(event)=>setPost(event.target.value)}
                    rows={6}
                    as="textarea"
                />
            </Form.Group>
        </Container>
    </Container>
  )
}
