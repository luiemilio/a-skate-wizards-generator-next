import Items from './Items';
import { CharacterContext, Item } from '../_lib/utils';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SectionName } from './Character';

const EquipmentDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 350px;
    width: 450px;
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
            <Items items={equipment}></Items>
        </EquipmentDiv>
    );
};

export default Equipment;
