import Items from './Items';
import { CharacterContext, Item } from '../_lib/utils';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Section, SectionName } from './Section';
import { LevelUpButton } from './Buttons';
import AddEquipmentModal from './AddEquipmentModal';

const EquipmentDiv = styled(Section)`
    border-bottom: 1px solid black;
`;

const SectionTitleDiv = styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;

    * {
        padding: 0px;
    }
`;

export const Equipment = () => {
    const { level, levelHistory } = useContext(CharacterContext);
    const [equipment, setEquipment] = useState<Item[]>([]);
    const [showAddEquipmentModal, setShowAddEquipmentModal] = useState(false);

    useEffect(() => {
        const currentStats = levelHistory.get(level);

        if (currentStats) {
            const { equipment } = currentStats;

            setEquipment(equipment);
        }
    }, [level, levelHistory]);

    return (
        <EquipmentDiv>
            {showAddEquipmentModal && (
                <AddEquipmentModal
                    onClose={() => setShowAddEquipmentModal(false)}
                ></AddEquipmentModal>
            )}
            <SectionTitleDiv>
                <SectionName>Equipment</SectionName>
                <LevelUpButton
                    onClick={() => setShowAddEquipmentModal(true)}
                ></LevelUpButton>
            </SectionTitleDiv>
            <Items items={equipment} highlightNames></Items>
        </EquipmentDiv>
    );
};

export default Equipment;
