import React from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faSignature, faFileSignature, faImagePortrait, faBarcode } from '@fortawesome/free-solid-svg-icons';
import './FormAuthor.css';


export default function FormAuthor({setId, objId, setName, setSurname, setDate, setEmail, setImg, name, surname, email, date, avatar}) {

    const formId = ["/api/authors/POST", "/api/authors/GET"];
    const formBlog = ["/api/authors/GET"];

    return (
        <Container fluid  className='d-flex flex-column m-3'>
            <Container fluid className="form-style">
                <InputGroup className={`mb-3 ${formId.includes(window.location.pathname) ? "d-none" : ""}`}>
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faBarcode} /></InputGroup.Text>
                    <Form.Control
                    value = {objId}
                    readOnly
                    placeholder="Object ID"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className={`mb-3 ${formBlog.includes(window.location.pathname) ? "" : "d-none"}`}>
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faBarcode} /></InputGroup.Text>
                    <Form.Control
                    onChange={(event)=>setId(event.target.value)}
                    placeholder="Object ID"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Container>
            <Container fluid className={`form-style ${!(window.location.pathname.includes(formBlog)) ? "" : "d-none"}`}>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSignature} /></InputGroup.Text>
                    <Form.Control
                    value={name}
                    onChange={(event)=>setName(event.target.value)}
                    placeholder="Name"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faFileSignature} /></InputGroup.Text>
                    <Form.Control
                    value={surname}
                    onChange={(event)=>setSurname(event.target.value)}
                    placeholder="Surname"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                    placeholder="e-mail"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faBaby} /></InputGroup.Text>
                    <Form.Control
                    value={date}
                    onChange={(event)=>setDate(event.target.value)}
                    placeholder="Date Of Birth"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faImagePortrait} /></InputGroup.Text>
                    <Form.Control
                    value={avatar}
                    onChange={(event)=>setImg(event.target.value)}
                    placeholder="Avatar"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Container>
        </Container>
    )
}