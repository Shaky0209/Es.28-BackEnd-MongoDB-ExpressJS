import React from 'react';
import {Container} from 'react-bootstrap';
import './MyFooter.css';

export default function MyFooter() {
  return (
    <Container fluid className='content d-flex justify-content-center align-items-center mx-0'>
        <div className='row '>
            <div className='col-12 col-md-4 d-flex justify-content-center align-items-center h-100'>
                <p className='mb-0 mt-5 pt-4'>Sede legale:<br/>Corriere Annunci s.r.l.<br/>Viale Aristide Merloni, 69<br/>Fabriano — Ancona</p>
            </div>
            <div className='col-12 col-md-4 d-flex justify-content-center align-items-center h-100'>
                <p className='mb-0 mt-5 pt-4'>Sede operativa:<br />Via E. Natali, 21<br/>Fabriano — Ancona</p>
            </div>
            <div className='col-12 col-md-4 d-flex justify-content-center align-items-center h-100'>
                <p className='mb-0 mt-5 pt-4'>Contatti:<br/>Tel.: +39 0732 645280<br/>Email: contact@corriereincontri.it</p>
            </div>
        <div className='col-12 d-flex justify-content-center h-100'>
            <p className='p-iva mb-0 mt-5 pt-5'>COPYRIGHT © 2024 - Corriere Annunci s.r.l. — P.IVA/C.F. IT03255659874, ISCR.REG.IMP. AN N. 03255659874, CAP. SOC. EURO 200.000,00</p>
        </div>
        </div>
    </Container>
  )
}
