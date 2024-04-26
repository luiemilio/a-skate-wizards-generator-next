import { useContext, useEffect, useState } from 'react';
import { LevelUpButton } from './Buttons';
import { CharacterContext, getNextId } from '../_lib/utils';
import { Item, getRandoSpell } from '../_lib/utils';
import styled from 'styled-components';
import Items from './Items';
import { Section, SectionName } from './Section';

const RandoSpellsDiv = styled(Section)`
    border-right: 1px solid black;

    @media all and (max-width: 1049px) {
        border-bottom: 1px solid black;
    }

    @media all and (max-width: 899px) {
        border-right: 0px solid black;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 200px;
    gap: 5px;
`;

const RandoSpellsWrapper = ({
    items,
    onItemDeletion
}: {
    items: Item[];
    onItemDeletion: (item: Item) => void;
}) => {
    return (
        <Items
            items={items}
            $removableItems
            onItemDeletion={onItemDeletion}
        ></Items>
    );
};

const RandoSpellsList = styled(RandoSpellsWrapper)`
    justify-content: center;
`;

const RandoSpells = () => {
    const { level, levelling, setLevelling, levelHistory, updateLevelHistory } =
        useContext(CharacterContext);

    const [randoSpells, setRandoSpells] = useState<Item[]>([]);

    const addRandoSpell = () => {
        const stats = levelHistory.get(level);

        if (stats) {
            updateLevelHistory(level, {
                ...stats,
                randoSpells: [
                    ...randoSpells,
                    { ...getRandoSpell(), id: getNextId(randoSpells) }
                ]
            });
        }

        setLevelling(false);
    };

    const onItemDeletion = (item: Item) => {
        const stats = levelHistory.get(level);

        if (stats) {
            const { randoSpells } = stats;
            const newRandoSpells = randoSpells.filter(
                (randoSpell) => randoSpell.id !== item.id
            );
            updateLevelHistory(level, {
                ...stats,
                randoSpells: newRandoSpells
            });
        }
    };

    useEffect(() => {
        const stats = levelHistory.get(level);

        if (stats) {
            const { randoSpells } = stats;
            setRandoSpells(randoSpells);
        }
    }, [level, levelHistory]);

    return (
        <RandoSpellsDiv>
            <Header>
                <SectionName>Rando Spells</SectionName>
                <LevelUpButton
                    onClick={addRandoSpell}
                    hidden={!levelling || level === 1 || level % 2 === 0}
                    disabled={!levelling || level === 1 || level % 2 === 0}
                ></LevelUpButton>
            </Header>
            <RandoSpellsList
                items={randoSpells}
                onItemDeletion={onItemDeletion}
            ></RandoSpellsList>
        </RandoSpellsDiv>
    );
};

export default RandoSpells;
