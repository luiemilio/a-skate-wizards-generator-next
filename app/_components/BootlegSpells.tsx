import Items from './Items';
import { CharacterContext, Item } from '../_lib/utils';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Section, SectionName } from './Section';

const BootLegSpellsDiv = styled(Section)``;

const BootlegSpells = () => {
    const { level, levelHistory } = useContext(CharacterContext);
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
            <Items items={bootlegSpells} highlightNames></Items>
        </BootLegSpellsDiv>
    );
};

export default BootlegSpells;
