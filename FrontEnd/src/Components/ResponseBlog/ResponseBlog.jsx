import React from 'react';
import Post from '../Post/Post';
import { Container, Row, Col } from 'react-bootstrap';

export default function ResponseBlog({content, refresh}) {
    
  return (
    <Container fluid className='pt-4'>
        <Row>
            {content.map((element) =>{
                const {author, category, content, cover, readTime, title, _id} = element;
                
                return(
                    <Col sm={6} md={4} lg={3} xl={2} className="my-2" key={_id}>
                        
                        <Post
                            id={_id}
                            category={category}
                            title={title}
                            cover={cover}
                            timeValue={readTime.value}
                            timeUnit={readTime.unit}
                            name={author.name}
                            avatar={author.avatar}
                            content={content}
                            refresh={refresh}
                        />
                    </Col>
                )
            })}
        </Row>
    </Container>
  )
}
