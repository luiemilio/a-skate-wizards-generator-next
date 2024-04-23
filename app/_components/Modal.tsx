import { useEffect } from 'react';
import styled from 'styled-components';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

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
    width: 450px;
    max-height: 700px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ModalDiv = styled.div`
    display: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    transform: translateZ(0px);
`;

const Modal = ({ children, onClose }: ModalProps) => {
    const handleClick = (e: MouseEvent) => {
        if ((e.target as HTMLDivElement)?.id === 'modal-overlay') {
            e.preventDefault();
            onClose();
        }
    };

    const handleEscKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEscKeyPress);

        return () => {
            document.removeEventListener('keydown', handleEscKeyPress);
        };
    });

    return (
        <ModalOverlay onClick={handleClick} id='modal-overlay'>
            <ModalWrapper>
                <ModalDiv>{children}</ModalDiv>
            </ModalWrapper>
        </ModalOverlay>
    );
};

export default Modal;