import styled from 'styled-components';
import { CharacterContext, textFont } from '../_lib/utils';
import React, { useContext, useEffect, useState } from 'react';
import { getLevelHistory } from '../_lib/db';

const CharPickerDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    * {
        box-sizing: border-box;
    }
`;

const SelectChar = styled.select`
    height: 30px;
    width: 155px;
`;

const LoadButton = styled.button`
    border-radius: 4px;
    border: none;
    background-color: black;
    color: white;
    text-align: center;
    padding: 5px;
    font-size: 0.9em;
    cursor: pointer;
`;

const CharPicker = ({ savedWizards }: { savedWizards: string[] }) => {
    const { setLevel, replaceLevelHistory, name, setName } = useContext(CharacterContext);
    const [selectedName, setSelectedName] = useState('');

    const onNameSelected = (e: React.FormEvent<HTMLSelectElement>) => {
        setSelectedName(e.currentTarget.value);
    };

    const handleLoad = () => {
        const levelHistory = getLevelHistory(selectedName);

        if (levelHistory) {
            const levels = Array.from(levelHistory.keys());
            const maxLevel = Math.max(...levels);
            setLevel(maxLevel);
            replaceLevelHistory(levelHistory);
            setName(selectedName);
        }
    };

    useEffect(() => {
        setSelectedName(savedWizards[0]);
    }, [savedWizards]);

    const populateWizards = () => {
        return savedWizards.map((wizard) => {
            return (
                <option key={wizard} defaultChecked={name === wizard}>
                    {wizard}
                </option>
            );
        });
    };

    return (
        <CharPickerDiv>
            <label>Wizard Warehouse</label>
            <SelectChar onChange={onNameSelected}>{populateWizards()}</SelectChar>
            <LoadButton className={textFont.className} onClick={handleLoad}>
                Load
            </LoadButton>
        </CharPickerDiv>
    );
};

export default CharPicker;
