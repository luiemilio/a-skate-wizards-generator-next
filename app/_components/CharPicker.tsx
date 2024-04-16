import styled from 'styled-components';
import { CharacterContext, textFont } from '../_lib/utils';
import React, { useContext, useState } from 'react';
import { getAllSavedWizardNames, getLevelHistory } from '../_lib/db';

const CharPickerDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    * {
        box-sizing: border-box;
    }
    height: 30px;
`;

const SelectChar = styled.select`
    height: 100%;
    width: 155px;
`;

const LoadButton = styled.button`
    border-radius: 4px;
    border: none;
    background-color: black;
    color: white;
    text-align: center;
    padding: 3px;
    font-size: 0.9em;
    height: 100%;
    cursor: pointer;
`;

const CharPicker = ({ savedWizards }: { savedWizards: string[] }) => {
    const { setLevel, replaceLevelHistory, name, setName } =
        useContext(CharacterContext);
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
            <SelectChar onChange={onNameSelected}>
                {populateWizards()}
            </SelectChar>
            <LoadButton className={textFont.className} onClick={handleLoad}>
                Load
            </LoadButton>
        </CharPickerDiv>
    );
};

export default CharPicker;
