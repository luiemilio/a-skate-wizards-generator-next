'use client';
import { useEffect, useState } from 'react';
import {
    CharacterContext,
    getInitialStatus,
    textFont,
    titleFont
} from '../app/_lib/utils';
import StatusBar from '../app/_components/StatusBar';
import Character from '../app/_components/Character';
import styled from 'styled-components';
import BailOut from '../app/_components/BailOutButton';

const Body = styled.body`
    margin: auto;
    max-width: 1350px;
    min-width: 450px;
    padding
`;

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
    const [statsMap, setStatsMap] = useState(new Map());
    const [level, setLevel] = useState(1);
    const [levelling, setLevelling] = useState(false);

    useEffect(() => {
        setStatsMap(getInitialStatus());
    }, []);

    return (
        <html style={{ boxSizing: 'border-box', padding: 0, margin: 0 }}>
            <Body>
                <CharacterContext.Provider
                    value={{
                        statsMap,
                        setStatsMap,
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
                        <StatusBar></StatusBar>
                        <Character></Character>
                    </Main>
                </CharacterContext.Provider>
            </Body>
        </html>
    );
};

export default Generator;
