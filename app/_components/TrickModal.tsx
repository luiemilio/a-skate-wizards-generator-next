import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { textFont } from '../_lib/utils';

const ModalOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    min-width: 450px;
    min-height: 2310px;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    margin: 0 auto;
`;

const ModalWrapper = styled.div`
    min-width: 450px;
    width: 500px;
    max-height: 700px;
    padding-top: 50px;
    padding-right: 10px;
    padding-left: 10px;
`;

const Modal = styled.div`
    display: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    transform: translateZ(0px);
`;

const ModalBody = styled.div`
    width: 100%;
    height: 100%;

    a:visited {
        color: white;
    }
`;

const TrickIframe = styled.iframe`
    width: 100%;
    height: 100%;
    display: block;
    border: none;
    -moz-border-radius: 15px;
    border-radius: 15px;
`;

const Credit = styled.p`
    position: absolute;
    color: white;
    bottom: 5px;
    left: 5px;
    font-size: 1.3em;
`;

const TrickModal = ({ onClose }: any) => {
    const handleCloseClick = (e: any) => {
        if (e.target.parentNode.id === 'modal-root') {
            e.preventDefault();
            onClose();
        }
    };

    const modalContent = (
        <ModalOverlay onClick={handleCloseClick}>
            <ModalWrapper>
                <Modal>
                    <ModalBody>
                        <TrickIframe src="https://dhamberlin.github.io/skate-wizards/"></TrickIframe>
                        <Credit className={textFont.className}>
                            Made by the gnarliest,{' '}
                            <a
                                href="https://github.com/dhamberlin"
                                target="_blank"
                            >
                                David H.
                            </a>
                        </Credit>
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
