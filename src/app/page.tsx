'use client'
import { createContext, useEffect, useState } from 'react';
import styles from './page.module.css';
import { getInitialStatus } from './utils/utils';
import StatusBar from './components/StatusBar';
import Character from './components/Character';

export const CharacterContext = createContext(new Map());
export const LevelUpContext = createContext(false);

const App = () => {
    const [characterStatus, setCharacterStatus] = useState(new Map());
    const [levelUp, setLevelUp] = useState(false);

    useEffect(() => {
        setCharacterStatus(getInitialStatus());
    }, []);

    return (
        <CharacterContext.Provider value={characterStatus}>
            <LevelUpContext.Provider value={levelUp}>
                <div className={styles.main}>
                    <div className={styles.title}>A Skate Wizards Generator</div>
                    <div className={`${styles.button} ${styles.bailOut}`}>Bail out!</div>
                    <StatusBar></StatusBar>
                    <Character></Character>
                </div>
            </LevelUpContext.Provider>
        </CharacterContext.Provider>
    );
};

export default App;
