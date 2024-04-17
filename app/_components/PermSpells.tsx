import Items from './Items';
import { CharacterContext, Item } from '../_lib/utils';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Section, SectionName } from './Section';

const PermSpellsDiv = styled(Section)`
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    @media all and (max-width: 1349px) {
        border-right: 0px solid black;
    }

    @media all and (max-width: 899px) {
        border-right: 0px solid black;
    }
`;

const PermSpells = () => {
    const { level, levelHistory } = useContext(CharacterContext);
    const [permSpells, setPermSpells] = useState<Item[]>([]);

    useEffect(() => {
        const stats = levelHistory.get(level);

        if (stats) {
            const { permSpells } = stats;
            setPermSpells(permSpells);
        }
    }, [level, levelHistory]);

    return (
        <PermSpellsDiv>
            <SectionName>Permanent Spells</SectionName>
            <Items items={permSpells} highlightNames></Items>
        </PermSpellsDiv>
    );
};

export default PermSpells;
