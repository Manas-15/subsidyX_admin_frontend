import React from 'react';
import { Spinner, Modal } from 'react-bootstrap';

const LoadingSpinner = ({ show }) => {
    return show && (
        <div style={{ position: "absolute", top: 0, left: 0, zIndex: "999999", background: "rgba(0,0,0,0.2)", height: "100vh", width: "100vw", }}>
            <div style={{ position: "absolute", top: "50%", left: "50%",  transform: 'translate("-50%","-50%")', }}>

                <Spinner size='lg' style={{ color: "#fa6130", height: "4rem", width: "4rem", borderWidth: "12px" }} animation="border" />
            </div>
        </div>
    );
};

export default LoadingSpinner;
