import Items from './Items';
import { CharacterContext, Item, SavedItem } from '../_lib/utils';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Section, SectionName } from './Section';
import { LevelUpButton } from './Buttons';
import AddBootlegSpellModal from './AddBootlegSpellModal';

const BootLegSpellsDiv = styled(Section)``;

const SectionTitleDiv = styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
`;

const BootlegSpells = () => {
    const { level, levelHistory, updateLevelHistory } = useContext(CharacterContext);
    const [bootlegSpells, setBootlegSpells] = useState<SavedItem[]>([]);
    const [showAddBootlegSpellModal, setShowAddBootlegSpellModal] = useState(false);

    useEffect(() => {
        const currentStats = levelHistory.get(level);

        if (currentStats) {
            const { bootlegSpells } = currentStats;

            setBootlegSpells(bootlegSpells);
        }
    }, [level, levelHistory]);

    const onItemDeletion = (item: SavedItem) => {
        const currentStats = levelHistory.get(level);

        if (currentStats) {
            const { bootlegSpells } = currentStats;
            const newBootLegSpells = bootlegSpells.filter(
                (bootlegSpell) => bootlegSpell.id !== item.id
            );
            const newStats = {
                ...currentStats,
                bootlegSpells: newBootLegSpells
            };
            updateLevelHistory(level, newStats);
        }
    };

    return (
        <BootLegSpellsDiv>
            {showAddBootlegSpellModal && (
                <AddBootlegSpellModal
                    onClose={() => setShowAddBootlegSpellModal(false)}
                ></AddBootlegSpellModal>
            )}
            <SectionTitleDiv>
                <SectionName>Bootleg Spells</SectionName>
                <LevelUpButton onClick={() => setShowAddBootlegSpellModal(true)}></LevelUpButton>
            </SectionTitleDiv>
            <Items
                items={bootlegSpells}
                highlightNames
                $removableItems
                onItemDeletion={onItemDeletion}
            ></Items>
        </BootLegSpellsDiv>
    );
};

export default BootlegSpells;
