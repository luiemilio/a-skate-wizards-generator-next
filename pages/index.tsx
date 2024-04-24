'use client';
import { useEffect, useState } from 'react';
import {
    CharacterContext,
    LevelHistory,
    Stats,
    getRandomStats,
    textFont,
    titleFont
} from '../app/_lib/utils';
import StatusBar from '@/app/_components/StatusBar';
import Character from '@/app/_components/Character';
import styled from 'styled-components';
import BailOut from '@/app/_components/BailOutButton';
import CharController from '@/app/_components/CharHandler';
import TrickModal from '@/app/_components/TrickModal';
import ClickTrick from '@/app/_components/TrickClick';

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    max-width: 1350px;
    font-size: 1.5em;
`;

const Title = styled.div`
    font-size: 4.2em;
    text-align: center;
`;

const MainButtons = styled.div`
    display: flex;
    gap: 50px;
`;

const SkateWizardCreditDiv = styled.div`
    align-self: flex-start;
`;

const Credit = styled.p`
    font-size: 0.7em;
`;

const SkateWizardsCredit = () => {
    return (
        <SkateWizardCreditDiv>
            <Credit>
                <a href='https://skatewizards.bigcartel.com/' target='_blank'>
                    Skate Wizards
                </a>{' '}
                and all images on this website are owned by{' '}
                <a href='https://michaelchsiung.com/en-us' target='_blank'>
                    Michael C. Hsiung (熊家麟).
                </a>
            </Credit>
        </SkateWizardCreditDiv>
    );
};

const Generator = () => {
    const [levelHistory, setLevelHistory] = useState(new Map());
    const [level, setLevel] = useState(1);
    const [levelling, setLevelling] = useState(false);
    const [name, setName] = useState('');
    const [showTrickModal, setShowTrickModal] = useState(false);

    const updateLevelHistory = (level: number, stats: Stats) => {
        setLevelHistory(new Map(levelHistory.set(level, stats)));
    };

    const replaceLevelHistory = (levelHistory: LevelHistory) => {
        setLevelHistory(new Map(levelHistory));
    };

    useEffect(() => {
        const initialStats = getRandomStats();
        const initialLevelMap = new Map([[1, initialStats]]);
        setLevelHistory(initialLevelMap);
    }, []);

    return (
        <CharacterContext.Provider
            value={{
                name,
                setName,
                levelHistory,
                updateLevelHistory,
                replaceLevelHistory,
                level,
                setLevel,
                levelling,
                setLevelling
            }}
        >
            <Main className={textFont.className}>
                {showTrickModal && (
                    <TrickModal
                        onClose={() => setShowTrickModal(false)}
                    ></TrickModal>
                )}
                <Title className={titleFont.className}>
                    A Skate Wizards Generator
                </Title>
                <MainButtons>
                    <ClickTrick
                        setShowTrickModal={setShowTrickModal}
                    ></ClickTrick>
                    <BailOut></BailOut>
                </MainButtons>
                <CharController></CharController>
                <StatusBar></StatusBar>
                <Character></Character>
                <SkateWizardsCredit></SkateWizardsCredit>
            </Main>
        </CharacterContext.Provider>
    );
};

export default Generator;
