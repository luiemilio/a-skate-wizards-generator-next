import styled from 'styled-components';
import { CharacterContext, SavedWizardsContext, textFont } from '../_lib/utils';
import { useContext, useEffect, useState } from 'react';
import { getAllSavedWizardNames, save } from '../_lib/db';
import { Dispatch, SetStateAction } from 'react';
import { Button } from './Buttons';

const CharSaverDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    * {
        box-sizing: border-box;
    }
`;

const NameInput = styled.input<{ $highlight?: boolean }>`
    height: 35px;
    border: 1px solid black;
    border-radius: 4px;
    text-align: start;
    font-size: 0.8em;
    padding: 5px;
    width: 190px;

    &:focus {
        outline: none;
    }
`;

const SaveButton = styled(Button)<{ $disabled?: boolean }>`
    padding: 5px;
    font-size: 0.9em;
    height: 100%;
    width: 62px;
    cursor: pointer;
    pointer-events: ${(props) => (props.$disabled ? 'none' : 'all')};
`;

const CharSaver = () => {
    const { name, setName, levelHistory, setSaved, saved } = useContext(CharacterContext);
    const { savedWizards, setSavedWizards } = useContext(SavedWizardsContext);
    const [currentInput, setCurrentInput] = useState('');

    const handleSave = () => {
        if (currentInput) {
            save(currentInput, levelHistory);
            setSavedWizards([
                ...savedWizards.filter((wizard) => wizard !== currentInput),
                currentInput
            ]);
            setName(currentInput);
            setSaved(true);
        }
    };

    useEffect(() => {
        setCurrentInput(name);
    }, [name]);

    return (
        <CharSaverDiv>
            <NameInput
                $highlight={saved}
                className={textFont.className}
                onChange={(e) => {
                    setCurrentInput(e.currentTarget.value);
                    setSaved(false);
                }}
                value={currentInput}
                placeholder='Name your wizard'
            />
            <SaveButton className={textFont.className} onClick={handleSave} $disabled={saved}>
                {saved ? 'Saved!' : 'Save'}
            </SaveButton>
        </CharSaverDiv>
    );
};

export default CharSaver;
