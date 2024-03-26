'use client';
import { createContext, useCallback, useEffect, useState, Dispatch, SetStateAction, useMemo } from 'react';
import styles from './page.module.css';
import { Item, getInitialStatus } from './utils/utils';
import StatusBar from './components/StatusBar';
import Character from './components/Character';

interface Stats {
    hp: number,
    defense: number,
    attackBonus: number,
    abilityScores: {
        strength: number,
        dexterity: number,
        will: number,
    },
    randoSpells: Item[],
    bootlegSpells: Item[],
    permSpells: Item[],
    items: Item[]
}

export interface Context {
    statsMap: Map<number, Stats>;
    setStatsMap: Dispatch<SetStateAction<Map<number, Stats>>>;
    level: number;
    setLevel: Dispatch<SetStateAction<number>>;
    levelling: boolean;
    setLevelling: Dispatch<SetStateAction<boolean>>
}

export const Context = createContext(({ statsMap: new Map(), setStatsMap: () => { }, level: 0, setLevel: () => { }, levelling: false, setLevelling: () => { } }) as Context);

const App = () => {
    const [statsMap, setStatsMap] = useState(new Map());
    const [level, setLevel] = useState(1);
    const [levelling, setLevelling] = useState(false);

    useEffect(() => {
        setStatsMap(getInitialStatus());
    }, []);

    return (
        <Context.Provider value={{ statsMap, setStatsMap, level, setLevel, levelling, setLevelling }}>
            <div className={styles.main}>
                <div className={styles.title}>A Skate Wizards Generator</div>
                <div className={`${styles.button} ${styles.bailOut}`}>Bail out!</div>
                <StatusBar></StatusBar>
                <Character></Character>
            </div>
        </Context.Provider>
    );
};

export default App;
