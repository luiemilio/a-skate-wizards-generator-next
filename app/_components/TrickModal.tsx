import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
    width: 500px;
    height: 600px;
`;

const Modal = styled.div`
    display: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    transform: translateZ(0px);
`;

const ModalBody = styled.div`
    width: 100%;
    height: 100%;
`;

const TrickIframe = styled.iframe`
    width: 100%;
    height: 100%;
    display: block;  /* iframes are inline by default */   
    border: none; /* Remove default border */
    background: lightyellow; /* Ju
    // border: 4px solid #000;
    -moz-border-radius: 15px;
    border-radius: 15px;
`;

const TrickModal = ({ onClose }: any) => {
    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <ModalOverlay onClick={handleCloseClick}>
            <ModalWrapper>
                <Modal>
                    <ModalBody>
                        <TrickIframe src="https://dhamberlin.github.io/skate-wizards/"></TrickIframe>
                    </ModalBody>
                </Modal>
            </ModalWrapper>
        </ModalOverlay>
    );

    const modalRoot = document.getElementById('modal-root');

    if (modalRoot) {
        return ReactDOM.createPortal(modalContent, modalRoot);
    }
};

export default TrickModal;
