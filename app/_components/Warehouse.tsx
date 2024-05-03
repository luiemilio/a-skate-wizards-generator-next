import CharPicker from './CharPicker';
import Modal from './Modal';
import styled from 'styled-components';

const WarehouseDiv = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    height: 300px;
    width: 100%;
    border: 3px solid black;
    padding: 10px;
    gap: 10px;
`;

const Warehouse = ({ onClose }: { onClose: () => void }) => {
    return (
        <Modal onClose={onClose}>
            <WarehouseDiv>
                <CharPicker onClose={onClose}></CharPicker>
            </WarehouseDiv>
        </Modal>
    );
};

export default Warehouse;
