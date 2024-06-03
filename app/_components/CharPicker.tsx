import styled from 'styled-components';
import {
    CharacterContext,
    SavedWizardsContext,
    textFont,
    Stats,
    normalizePropName
} from '../_lib/utils';
import React, { useContext, useEffect, useState } from 'react';
import { deleteWizard, getSaveInfo } from '../_lib/db';
import { Button } from './Buttons';

const CharPickerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    width: 100%;

    * {
        box-sizing: border-box;
    }
`;

const Header = styled.div`
    align-self: center;
    font-size: 1.5em;
    font-weight: 600;
`;

const WarehouseButton = styled(Button)`
    padding: 5px;
    font-size: 0.9em;
    height: 100%;
    cursor: pointer;
`;

const Wizards = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
`;

const WizardsUl = styled.div`
    width: 150px;
    height: 180px;
    border: 1px solid black;
    border-radius: 4px;
    list-style-type: none;
    overflow-x: hidden;
    overflow-y: scroll;
`;

const WizardLi = styled.li<{ $selected?: boolean }>`
    cursor: pointer;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;

    &:hover {
        background-color: ${(props) => (props.$selected ? 'gray' : 'lightgray')};
    }

    background-color: ${(props) => (props.$selected ? 'gray' : 'none')};
`;

const DescriptionDiv = styled.div`
    width: 200px;
`;

const DescriptionUl = styled.ul`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    list-style-type: none;
`;
const DescriptionLi = styled.li`
    font-size: 0.9em;
`;

const Description = ({ stats }: { stats?: Stats & { level: number } }) => {
    const populateStats = () => {
        if (stats) {
            const {
                level,
                abilityScores: { strength, will, dexterity },
                hp,
                defense,
                attackBonus
            } = stats;
            const validStats = { level, strength, will, dexterity, hp, defense, attackBonus };

            return (
                <DescriptionUl>
                    {Object.entries(validStats).map(([key, value]) => {
                        return (
                            <DescriptionLi
                                key={`${key}-${Math.random() * 1000}`}
                                value={`${key}: ${value}`}
                            >
                                {`${normalizePropName(key)}: ${value}`}
                            </DescriptionLi>
                        );
                    })}
                </DescriptionUl>
            );
        }
    };

    return <DescriptionDiv>{populateStats()}</DescriptionDiv>;
};

const Buttons = styled.div`
    display: flex;
    gap: 5px;
`;

const CharPicker = ({ onClose }: { onClose: () => void }) => {
    const { savedWizards, setSavedWizards } = useContext(SavedWizardsContext);
    const { setLevel, replaceLevelHistory, name, setName, setSaved, setCurrentStats } = useContext(CharacterContext);
    const [selectedWizard, setSelectedWizard] = useState<string>();
    const [selectedStats, setSelectedStats] = useState<(Stats & { level: number }) | undefined>();

    const updateSelectedWizard = (wizard: string) => {
        setSelectedWizard(wizard);

        const saveInfo = getSaveInfo(wizard);

        if (saveInfo?.levelHistory) {
            const levels = Array.from(saveInfo.levelHistory.keys());
            const level = Math.max(...levels);
            const stats = saveInfo.levelHistory.get(level);

            if (level && stats) {
                setSelectedStats({ level, ...stats });
            }
        }
    };

    const onClick = (e: React.MouseEvent<HTMLLIElement>, wizard: string) => {
        updateSelectedWizard(wizard);
    };

    const handleLoad = () => {
        if (selectedWizard) {
            const saveInfo = getSaveInfo(selectedWizard);
            
            if (saveInfo) {
                const { levelHistory, currentStats } = saveInfo;

                if (levelHistory && currentStats) {
                    const levels = Array.from(levelHistory.keys());
                    const maxLevel = Math.max(...levels);
                    setLevel(maxLevel);
                    replaceLevelHistory(levelHistory);
                    setName(selectedWizard);
                    setCurrentStats(currentStats);
                }
            }

            onClose();
        }
    };

    const handleDelete = () => {
        if (selectedWizard) {
            deleteWizard(selectedWizard);
            const idx = savedWizards.indexOf(selectedWizard);
            const newWizards = [...savedWizards.filter((wizard) => wizard !== selectedWizard)];
            setSavedWizards(newWizards);
            updateSelectedWizard(newWizards[idx > 0 ? idx - 1 : 0]);

            if (name === selectedWizard) {
                setSaved(false);
            }

            if (newWizards.length === 0) {
                onClose();
            }
        }
    };

    useEffect(() => {
        updateSelectedWizard(savedWizards[0]);
    }, []);

    return (
        <CharPickerDiv>
            <Header>Load a wizard</Header>
            <Wizards>
                <WizardsUl>
                    {savedWizards.map((wizard) => {
                        const key = `${wizard}-${Math.random() * 1000}`;

                        return (
                            <WizardLi
                                $selected={selectedWizard === wizard}
                                onClick={(e: any) => onClick(e, wizard)}
                                key={key}
                                value={wizard}
                            >
                                {wizard}
                            </WizardLi>
                        );
                    })}
                </WizardsUl>
                <Description stats={selectedStats}></Description>
            </Wizards>
            <Buttons>
                <WarehouseButton className={textFont.className} onClick={handleLoad}>
                    Load
                </WarehouseButton>
                <WarehouseButton className={textFont.className} onClick={handleDelete}>
                    Delete
                </WarehouseButton>
            </Buttons>
        </CharPickerDiv>
    );
};

export default CharPicker;
