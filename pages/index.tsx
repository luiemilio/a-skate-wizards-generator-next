'use client';
import { useEffect, useState } from 'react';
import {
    CharacterContext,
    SavedWizardsContext,
    LevelHistory,
    Stats,
    getRandomStats,
    textFont,
    titleFont,
    CurrentStats
} from '../app/_lib/utils';
import StatusBar from '@/app/_components/StatusBar';
import Character from '@/app/_components/Character';
import styled from 'styled-components';
import CharController from '@/app/_components/CharController';
import { AnimatedWizard } from '@/app/_components/AnimatedWizard';
import chillWizardOnSkateBoard from '../app/_assets/images/wizardchillonskateboard.png';
import wizardOnMushroom from '../app/_assets/images/wizardonmushroom.png';
import LevelUp from '@/app/_components/LevelUp';
import { getAllSavedWizardNames } from '@/app/_lib/db';
import CharSaver from '@/app/_components/CharSaver';

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-size: 1.5em;
`;

const TitleDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
    max-width: 700px;
`;

const TitleHeader = styled.header`
    font-size: 3.2em;
    text-align: center;
`;

const SkateWizardCreditDiv = styled.div`
    align-self: flex-start;
    padding: 10px;
`;

const Credit = styled.p`
    font-size: 0.7em;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

const NameAndLevelWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
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

const Title = () => {
    return (
        <TitleDiv>
            <AnimatedWizard
                animationid='chillWizard'
                src={chillWizardOnSkateBoard}
                alt='chill wizard'
                width={100}
                height={60}
                trick='front-flip'
            />
            <TitleHeader className={titleFont.className}>A Skate Wizards Generator</TitleHeader>
            <AnimatedWizard
                animationid='mushroomWizard'
                src={wizardOnMushroom}
                alt='mushroom wizard'
                width={70}
                height={70}
                trick='blast-off'
            />
        </TitleDiv>
    );
};

const Generator = () => {
    const [levelHistory, setLevelHistory] = useState(new Map());
    const [level, setLevel] = useState(1);
    const [levelling, setLevelling] = useState(false);
    const [name, setName] = useState('');
    const [savedWizards, setSavedWizards] = useState<string[]>([]);
    const [saved, setSaved] = useState<boolean>(false);
    const [currentStats, setCurrentStats] = useState<CurrentStats>({});

    const updateLevelHistory = (level: number, stats: Stats) => {
        setLevelHistory(new Map(levelHistory.set(level, stats)));
    };

    const replaceLevelHistory = (levelHistory: LevelHistory) => {
        setLevelHistory(new Map(levelHistory));
    };

    useEffect(() => {
        const initialStats = getRandomStats();
        const { hp, defense, attackBonus } = initialStats;
        const initialLevelMap = new Map([[1, initialStats]]);
        const savedWizards = getAllSavedWizardNames();

        setLevelHistory(initialLevelMap);
        setSavedWizards(savedWizards);
        setCurrentStats({
            hp,
            defense,
            attackBonus
        });
    }, []);

    useEffect(() => {
        setSaved(false);
    }, [levelHistory]);

    return (
        <SavedWizardsContext.Provider
            value={{
                savedWizards,
                setSavedWizards
            }}
        >
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
                    setLevelling,
                    saved,
                    setSaved,
                    currentStats,
                    setCurrentStats
                }}
            >
                <Main className={textFont.className}>
                    <Title />
                    <CharController></CharController>
                    <Details>
                        <NameAndLevelWrapper>
                            <CharSaver />
                            <LevelUp></LevelUp>
                        </NameAndLevelWrapper>
                        <StatusBar></StatusBar>
                        <Character></Character>
                    </Details>
                    <SkateWizardsCredit></SkateWizardsCredit>
                </Main>
            </CharacterContext.Provider>
        </SavedWizardsContext.Provider>
    );
};

export default Generator;
