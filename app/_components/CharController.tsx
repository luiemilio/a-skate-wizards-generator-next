import CharSaver from './CharSaver';
import CharPicker from './CharPicker';
import { getAllSavedWizardNames } from '../_lib/db';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LevelUp from './LevelUp';
import ClickTrick from './TrickClick';
import BailOut from './BailOutButton';
import TrickModal from './TrickModal';

const CharControllerDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    min-height: 30px;
    gap: 10px;

    @media all and (max-width: 899px) {
        justify-content: center;
    }
`;

const CharButtons = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 50px;
    align-items: center;
`;

const CharController = () => {
    const [savedWizards, setSavedWizards] = useState<string[]>([]);
    const [showTrickModal, setShowTrickModal] = useState(false);

    useEffect(() => {
        setSavedWizards(getAllSavedWizardNames());
    }, []);

    return (
        <CharControllerDiv>
            {showTrickModal && <TrickModal onClose={() => setShowTrickModal(false)}></TrickModal>}
            <CharSaver setSavedWizards={setSavedWizards}></CharSaver>
            <CharButtons>
                <ClickTrick setShowTrickModal={setShowTrickModal}></ClickTrick>
                <LevelUp></LevelUp>
                <BailOut></BailOut>
            </CharButtons>
            <CharPicker savedWizards={savedWizards}></CharPicker>
        </CharControllerDiv>
    );
};

export default CharController;
