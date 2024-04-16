import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Author from '../Author/Author';

export default function Response({content, refresh}) {

  return (

    <Container fluid className='pt-4'>
        <Row>
            {content.map(({ avatar, dateOfBirth, email, name, surname, _id }) =>{
                
                return(                    
                    <Col sm={6} md={4} lg={3} xl={2} className="my-2" key={_id}>
                        <Author
                            id={_id || 222}
                            avatar={avatar}
                            date={dateOfBirth}
                            email={email}
                            name={name}
                            surname={surname}
                            refresh = {refresh}
                        />
                    </Col>
                )
             })
            }
            
        
        </Row>
    </Container>
  )
}
