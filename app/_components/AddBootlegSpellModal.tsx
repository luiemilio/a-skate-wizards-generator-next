import styled from 'styled-components';
import { CharacterContext, getNextId } from '../_lib/utils';
import Modal from './Modal';
import { useContext, useState } from 'react';
import { Button } from './Buttons';
import { BOOTLEG_SPELLS } from '../_lib/constants';
import type { Item, SavedItem } from '../_lib/utils';
import ItemPicker from './ItemPicker';
import ItemAdder from './ItemAdder';

const AddBootlegSpellModalDiv = styled.div`
    display: flex;
    flex-direction: column;
    border: 5px solid black;
    background-color: white;
    justify-content: space-between;
    height: fit-content;
`;

const AdderDiv = styled.div`
    background-color: white;
    border: 5px solid black;
`;

const BootlegSpellAdder = ({
    onClose,
    addBootlegSpell
}: {
    onClose: () => void;
    addBootlegSpell: any;
}) => {
    return (
        <Modal onClose={onClose}>
            <AdderDiv>
                <ItemAdder title='Enter bootleg spell' onItemAdd={addBootlegSpell} />
            </AdderDiv>
        </Modal>
    );
};

const OpenBootlegSpellAdderButton = styled(Button)`
    font-size: 0.9em;
    padding: 5px;
    width: fit-content;
    margin: 5px;
`;

const AddBootlegSpellModal = ({ onClose }: { onClose: () => void }) => {
    const { level, levelHistory, updateLevelHistory } = useContext(CharacterContext);
    const [showBootlegSpellAdder, setShowBootlegSpellAdder] = useState(false);

    const addBootlegSpell = (spell: Item) => {
        const currentStats = levelHistory.get(level);

        if (currentStats) {
            const { bootlegSpells } = currentStats;
            const newBootlegSpell = {
                ...spell,
                id: getNextId(bootlegSpells)
            };
            const newBootlegSpells = [...bootlegSpells, newBootlegSpell];
            const newStats = {
                ...currentStats,
                bootlegSpells: newBootlegSpells
            };
            updateLevelHistory(level, newStats);
        }

        onClose();
    };

    const openAdder = () => {
        setShowBootlegSpellAdder(true);
    };

    return (
        <Modal onClose={onClose}>
            <AddBootlegSpellModalDiv>
                {showBootlegSpellAdder && (
                    <BootlegSpellAdder onClose={onClose} addBootlegSpell={addBootlegSpell} />
                )}
                <ItemPicker
                    title='Add Bootleg Spell'
                    items={BOOTLEG_SPELLS}
                    onItemAdd={addBootlegSpell}
                />
                <OpenBootlegSpellAdderButton onClick={openAdder}>
                    Custom bootleg spell?
                </OpenBootlegSpellAdderButton>
            </AddBootlegSpellModalDiv>
        </Modal>
    );
};

export default AddBootlegSpellModal;
