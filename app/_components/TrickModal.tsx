import styled from 'styled-components';
import { textFont } from '../_lib/utils';
import Modal from './Modal';

const ModalBody = styled.div`
    a:visited {
        color: white;
    }
`;

const TrickIframe = styled.iframe`
    width: 100%;
    height: 600px;
    display: block;
    border: none;
    -moz-border-radius: 15px;
    border-radius: 15px;
    padding-left: 5px;
    padding-right: 5px;
`;

const Credit = styled.p`
    position: absolute;
    color: white;
    bottom: 5px;
    left: 10px;
    font-size: 0.8em;
`;

const TrickModal = ({ onClose }: { onClose: () => void }) => {
    const TrickModal = () => (
        <ModalBody>
            <TrickIframe src='https://dhamberlin.github.io/skate-wizards/'></TrickIframe>
            <Credit className={textFont.className}>
                Trick generator made by the gnarliest,{' '}
                <a href='https://github.com/dhamberlin' target='_blank'>
                    David H.
                </a>
            </Credit>
        </ModalBody>
    );

    return (
        <Modal onClose={onClose}>
            <TrickModal />
        </Modal>
    );
};

export default TrickModal;
