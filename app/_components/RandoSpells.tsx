import { useContext, useEffect, useState } from 'react';
import { LevelUpButton } from './Buttons';
import { CharacterContext } from '../_lib/utils';
import { Item, getRandoSpell } from '../_lib/utils';
import styled from 'styled-components';
import { SectionName } from './Character';
import Items from './Items';

const RandoSpellsDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 350px;
    width: 450px;
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
    align-self: center;
    width: 200px;
`;

const RandoSpellsList = styled(Items)`
    justify-content: center;
`;

const RandoSpells = () => {
    const { level, levelling, setLevelling, levelHistory, updateLevelHistory } =
        useContext(CharacterContext);
    
    const [randoSpells, setRandoSpells] = useState<Item[]>([]);

    const addRandoSpell = () => {
        const stats = levelHistory.get(level);

        if (stats) {
            updateLevelHistory(level, { ...stats, randoSpells: [...randoSpells, getRandoSpell()] })
        }

        setLevelling(false);
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
            <RandoSpellsList items={randoSpells}></RandoSpellsList>
        </RandoSpellsDiv>
    );
};

export default RandoSpells;
