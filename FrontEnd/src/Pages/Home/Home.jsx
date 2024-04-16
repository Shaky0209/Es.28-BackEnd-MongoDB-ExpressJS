import React from 'react'
import Container from 'react-bootstrap/Container';
import './Home.css';

export default function Home() {
  return (
    <Container fluid className='body-home d-flex justify-content-center align-items-center'>
        <Container className='content-style p-5'>
            <h1>Per utilizzare questa API accedi alle funzionalità espresse sulla navbar.</h1>
        </Container>
    </Container>

  )
}