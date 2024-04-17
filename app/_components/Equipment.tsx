import Items from './Items';
import { CharacterContext, Item } from '../_lib/utils';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Section, SectionName } from './Section';

const EquipmentDiv = styled(Section)`
    border-bottom: 1px solid black;
`;

export const Equipment = () => {
    const { level, levelHistory } = useContext(CharacterContext);
    const [equipment, setEquipment] = useState<Item[]>([]);

    useEffect(() => {
        const currentStats = levelHistory.get(level);

        if (currentStats) {
            const { equipment } = currentStats;

            setEquipment(equipment);
        }
    }, [level, levelHistory]);

    return (
        <EquipmentDiv>
            <SectionName>Equipment</SectionName>
            <Items items={equipment} highlightNames></Items>
        </EquipmentDiv>
    );
};

export default Equipment;
