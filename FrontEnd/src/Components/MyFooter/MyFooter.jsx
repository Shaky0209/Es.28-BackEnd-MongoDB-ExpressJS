import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import './MyFooter.css';

export default function MyFooter() {
  return (
    <Container fluid className='footer'>
        <Row className='h-100'>
            <Col className='col d-flex justify-content-center align-items-center h-100'>
                <p>Sede legale:<br/>Corriere Annunci s.r.l.<br/>Viale Aristide Merloni, 79<br/>Fabriano — Ancona</p>
            </Col>
            <Col className='col d-flex justify-content-center align-items-center h-100'>
                <p>Sede operativa:<br />Via E. Natali, 9<br/>Fabriano — Ancona</p>
            </Col>
            <Col className='col d-flex justify-content-center align-items-center h-100'>
                <p>Contatti:<br/>Tel.: +39 0732 5452<br/>Email: info@samaref.it</p>
            </Col>
        </Row>
        <Container>
            <p className='p-iva text-center mb-0 pb-3'>COPYRIGHT © 2024 - Corriere Annunci s.r.l. — P.IVA/C.F. IT02155650423, ISCR.REG.IMP. AN N. 02155650423, CAP. SOC. EURO 100.000,00 (I.V.)</p>
        </Container>
    </Container>
  )
}
