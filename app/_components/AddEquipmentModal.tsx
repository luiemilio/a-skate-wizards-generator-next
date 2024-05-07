import { CharacterContext, Item, getNextId } from '../_lib/utils';
import Modal from './Modal';
import { useContext, useState } from 'react';
import ItemAdder from './ItemAdder';
import styled from 'styled-components';
import { ITEMS } from '../_lib/constants';
import ItemPicker from './ItemPicker';
import { Button } from './Buttons';

const MainDiv = styled.div`
    background-color: white;
    border: 5px solid black;
`;

const AdderDiv = styled.div`
    background-color: white;
    border: 5px solid black;
`;

const OpenEquipmentAdderButton = styled(Button)`
    font-size: 0.9em;
    padding: 5px;
    width: fit-content;
    margin: 5px;
`;

const EquipmentAdder = ({ onClose, addEquipment }: { onClose: () => void; addEquipment: any }) => {
    return (
        <Modal onClose={onClose}>
            <AdderDiv>
                <ItemAdder title='Enter equipment' onItemAdd={addEquipment} />
            </AdderDiv>
        </Modal>
    );
};

const AddEquipmentModal = ({ onClose }: { onClose: () => void }) => {
    const { level, levelHistory, updateLevelHistory } = useContext(CharacterContext);
    const [showEquipmentAdder, setShowEquipmentAdder] = useState(false);

    const addEquipment = (equipmentToAdd: Item) => {
        const currentStats = levelHistory.get(level);

        if (currentStats) {
            const { equipment } = currentStats;
            const newEquipment = { ...equipmentToAdd, id: getNextId(equipment) };
            const newEquipmentArray = [...equipment, newEquipment];
            const newStats = { ...currentStats, equipment: newEquipmentArray };
            updateLevelHistory(level, newStats);
        }

        onClose();
    };

    const openAdder = () => {
        setShowEquipmentAdder(true);
    };

    return (
        <Modal onClose={onClose}>
            <MainDiv>
                {showEquipmentAdder && (
                    <EquipmentAdder onClose={onClose} addEquipment={addEquipment} />
                )}
                <ItemPicker title='Add an equipment' items={ITEMS} onItemAdd={addEquipment} />
                <OpenEquipmentAdderButton onClick={openAdder}>
                    Custom equipment?
                </OpenEquipmentAdderButton>
            </MainDiv>
        </Modal>
    );
};

export default AddEquipmentModal;
