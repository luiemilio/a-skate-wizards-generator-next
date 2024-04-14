import Items from './Items';
import { CharacterContext, Item } from '../_lib/utils';
import { useContext, useEffect, useState } from 'react';
import { SectionName } from './Character';
import styled from 'styled-components';

const BootLegSpellsDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 350px;
    width: 450px;
`;

const BootlegSpells = () => {
    const { level, levelling, setLevel, setLevelling, levelHistory, setlevelHistory } =
        useContext(CharacterContext);
    const [bootlegSpells, setBootlegSpells] = useState<Item[]>([]);

    useEffect(() => {
        const currentStats = levelHistory.get(level);

        if (currentStats) {
            const { bootlegSpells } = currentStats;

            setBootlegSpells(bootlegSpells);
        }
    }, [level, levelHistory]);

    return (
        <BootLegSpellsDiv>
            <SectionName>Bootleg Spells</SectionName>
            <Items items={bootlegSpells}></Items>
        </BootLegSpellsDiv>
    );
};

export default BootlegSpells;
