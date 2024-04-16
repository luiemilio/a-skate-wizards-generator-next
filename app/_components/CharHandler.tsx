import CharSaver from './CharSaver';
import CharPicker from './CharPicker';
import { getAllSavedWizardNames } from '../_lib/db';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const CharControllerDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
`;

const CharController = () => {
    const [savedWizards, setSavedWizards] = useState<string[]>([]);

    useEffect(() => {
        setSavedWizards(getAllSavedWizardNames());
    }, []);

    return (
        <CharControllerDiv>
            <CharSaver setSavedWizards={setSavedWizards}></CharSaver>
            <CharPicker savedWizards={savedWizards}></CharPicker>
        </CharControllerDiv>
    );
};

export default CharController;
