import styled from 'styled-components';
import { CharacterContext, Item, getNextId, textFont } from '../_lib/utils';
import Modal from './Modal';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Button } from './Buttons';
import { BOOTLEG_SPELLS } from '../_lib/constants';

const AddBootlegSpellDiv = styled.div`
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
    align-self: center;
    padding: 5px;
    font-size: 1em;
`;

const Spells = styled.div`
    display: flex;
`;

const SpellsUl = styled.ul`
    width: fit-content;
    border: 1px solid black;
    border-radius: 4px;
    list-style-type: none;
`;

const SpellLi = styled.li<{ $selected?: boolean }>`
    cursor: pointer;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;

    &:hover {
        background-color: ${(props) => (props.$selected ? 'gray' : 'lightgray')};
    }

    background-color: ${(props) => (props.$selected ? 'gray' : 'none')};
`;

const Description = styled.div`
    width: 270px;
    height: 180px;
    padding: 0px 0px 0px 10px;
`;

const AddBootlegSpellModal = ({ onClose }: { onClose: () => void }) => {
    const { level, levelHistory, updateLevelHistory } = useContext(CharacterContext);

    const [selectedSpell, setSelectedSpell] = useState<Item>();
    const [selectedDescription, setSelectedDescription] = useState<string>();

    const addBootlegSpell = () => {
        const currentStats = levelHistory.get(level);

        if (currentStats && selectedSpell) {
            const { bootlegSpells } = currentStats;
            const newBootlegSpell = {
                ...selectedSpell,
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

    const onClick = (e: React.MouseEvent<HTMLLIElement>, spell: Item) => {
        setSelectedSpell(spell);
        setSelectedDescription(spell.description);
    };

    return (
        <Modal onClose={onClose}>
            <AddBootlegSpellDiv>
                <Header>Pick a bootleg spell</Header>
                <Spells>
                    <SpellsUl>
                        {BOOTLEG_SPELLS.map((spell) => {
                            const { name } = spell;
                            const key = `${name}-${Math.random() * 1000}`;

                            return (
                                <SpellLi
                                    $selected={selectedSpell?.name === name}
                                    onClick={(e: any) => onClick(e, spell)}
                                    key={key}
                                    value={name}
                                >
                                    {name}
                                </SpellLi>
                            );
                        })}
                    </SpellsUl>
                    <Description>{selectedDescription}</Description>
                </Spells>
                <AddButton onClick={addBootlegSpell}>Add</AddButton>
            </AddBootlegSpellDiv>
        </Modal>
    );
};

export default AddBootlegSpellModal;
