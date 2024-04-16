import styled from 'styled-components';
import { CharacterContext, textFont } from '../_lib/utils';
import { useContext } from 'react';
import { getAllSavedWizardNames, save } from '../_lib/db';
import { Dispatch, SetStateAction } from 'react';

const CharSaverDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    * {
        box-sizing: border-box;
    }
    height: 30px;
`;

const NameInput = styled.input`
    height: 100%;
`;

const SaveButton = styled.button`
    border-radius: 4px;
    border: none;
    background-color: black;
    color: white;
    text-align: center;
    padding: 3px;
    font-size: 0.9em;
    height: 100%;
`;

const CharSaver = ({
    setSavedWizards
}: {
    setSavedWizards: Dispatch<SetStateAction<string[]>>;
}) => {
    const { name, setName, levelHistory } = useContext(CharacterContext);

    const handleSave = () => {
        save(name, levelHistory);
        const wizards = getAllSavedWizardNames();
        setSavedWizards(wizards);
    };

    return (
        <CharSaverDiv>
            <label>Name</label>
            <NameInput
                onChange={(e) => setName(e.currentTarget.value)}
                value={name}
            ></NameInput>
            <SaveButton className={textFont.className} onClick={handleSave}>
                Save
            </SaveButton>
        </CharSaverDiv>
    );
};

export default CharSaver;
