import { CharacterContext, Item, getNextId } from '../_lib/utils';
import Modal from './Modal';
import { useContext } from 'react';
import ItemAdder from './ItemAdder';

const AddEquipmentModal = ({ onClose }: { onClose: () => void }) => {
    const { level, levelHistory, updateLevelHistory } = useContext(CharacterContext);

    const addEquipment = ({ name, description }: Item) => {
        const currentStats = levelHistory.get(level);

        if (currentStats) {
            const { equipment } = currentStats;
            const newEquipment = [...equipment, { name, description, id: getNextId(equipment) }];
            const newStats = { ...currentStats, equipment: newEquipment };
            updateLevelHistory(level, newStats);
        }

        onClose();
    };

    return (
        <Modal onClose={onClose}>
            <ItemAdder title='Add Equipment' onItemAdd={addEquipment} onClose={onClose} />
        </Modal>
    );
};

export default AddEquipmentModal;
