import styled from 'styled-components';
import { CharacterContext, textFont } from '../_lib/utils';
import Modal from './Modal';
import { useContext, useState } from 'react';
import { Button } from './Buttons';

const AddEquipmentDiv = styled.div`
    border: 5px solid black;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 5px;
    gap: 5px;
`;

const Header = styled.div`
    align-self: center;
    font-size: 1.5em;
    font-weight: 600;
`;

const AddButton = styled(Button)`
    width: fit-content;
    padding: 5px;
    font-size: 1em;
`;

const NameInput = styled.input`
    width: 200px;
    font-size: 0.8em;
`;

const DescriptionInput = styled.textarea`
    width: 100%;
    height: 200px;
    resize: none;
    font-size: 0.8em;
`;

const AddEquipmentModal = ({ onClose }: { onClose: () => void }) => {
    const { level, levelHistory, updateLevelHistory } =
        useContext(CharacterContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const addEquipment = () => {
        const currentStats = levelHistory.get(level);

        if (currentStats) {
            const { equipment } = currentStats;
            const newEquipment = [...equipment, { name, description }];
            const newStats = { ...currentStats, equipment: newEquipment };
            updateLevelHistory(level, newStats);
        }

        onClose();
    };

    return (
        <Modal onClose={onClose}>
            <AddEquipmentDiv>
                <Header>Add Equipment</Header>
                <label>Name</label>
                <NameInput
                    className={textFont.className}
                    type='text'
                    name='item'
                    onChange={(e) => setName(e.currentTarget.value)}
                />
                <label>Description</label>
                <DescriptionInput
                    className={textFont.className}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                />
                <AddButton onClick={addEquipment}>Add</AddButton>
            </AddEquipmentDiv>
        </Modal>
    );
};

export default AddEquipmentModal;