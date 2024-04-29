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
import CharController from '@/app/_components/CharController';

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    max-width: 1350px;
    font-size: 1.5em;
`;

const Title = styled.div`
    font-size: 4.2em;
    text-align: center;
`;

const SkateWizardCreditDiv = styled.div`
    align-self: flex-start;
`;

const Credit = styled.p`
    font-size: 0.7em;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
                <Title className={titleFont.className}>A Skate Wizards Generator</Title>
                <CharController></CharController>
                <Details>
                    <StatusBar></StatusBar>
                    <Character></Character>
                </Details>
                <SkateWizardsCredit></SkateWizardsCredit>
            </Main>
        </CharacterContext.Provider>
    );
};

export default Generator;
