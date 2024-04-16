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
import CharSaver from '@/app/_components/CharSaver';
import CharPicker from '@/app/_components/CharPicker';
import CharController from '@/app/_components/CharHandler';

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
                <Title className={titleFont.className}>
                    A Skate Wizards Generator
                </Title>
                <BailOut></BailOut>
                <CharController></CharController>
                <StatusBar></StatusBar>
                <Character></Character>
            </Main>
        </CharacterContext.Provider>
    );
};

export default Generator;
