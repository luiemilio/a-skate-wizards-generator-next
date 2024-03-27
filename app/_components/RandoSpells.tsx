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
    justify-content: center;
    height: 350px;
    max-width: 650px;
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
`;

const RandoSpells = () => {
    const { level, levelling, setLevel, setLevelling, statsMap, setStatsMap } =
        useContext(CharacterContext);
    const [randoSpells, setRandoSpells] = useState<Item[]>([]);

    const addRandoSpell = () => {
        const randoSpell = getRandoSpell();
        const currentRandoSpells = randoSpells;
        currentRandoSpells.push(randoSpell);
        setRandoSpells(currentRandoSpells);
        setLevelling(false);
    };

    useEffect(() => {
        const currentStats = statsMap.get(level);

        if (currentStats) {
            const { randoSpells } = currentStats;

            setRandoSpells(randoSpells);
        }
    }, [level, statsMap]);

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
            <Items items={randoSpells}></Items>
        </RandoSpellsDiv>
    );
};

export default RandoSpells;
