import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function MultipleButton({content, btnFnc}) {
  
  return (
    <Container fluid className='d-flex justify-content-center w-25 py-3 px-0'>
            <Button style={{textWrap:"nowrap"}} variant="outline-primary" 
            onClick={()=> btnFnc()} 
            >
              {content}
            </Button>
    </Container>
  )
}
