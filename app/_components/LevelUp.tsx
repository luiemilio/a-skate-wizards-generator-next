import styles from '../page.module.css';
import { CharacterContext } from '../_lib/utils';
import { useContext, useEffect } from 'react';
import { LevelUpButton, LevelDownButton } from './Buttons';
import styled from 'styled-components';

const LevelUpDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

const LevelUp = () => {
    const { level, levelling, setLevel, setLevelling, statsMap, setStatsMap } =
        useContext(CharacterContext);

    const levelDown = () => {
        if (level > 1) {
            console.log('setting level: ', level - 1);
            setLevel(level - 1);
            setLevelling(true);
        }
    };

    const levelUp = () => {
        if (level < 7) {
            const newLevel = level + 1;
            console.log('setting level: ', newLevel);
            const currentStats = statsMap.get(level);

            if (currentStats) {
                const newStats = { ...currentStats, hp: currentStats.hp + 2 };
                statsMap.set(newLevel, newStats);
            }

            setLevelling(true);
            setLevel(level + 1);
        }
    };

    return (
        <LevelUpDiv>
            <LevelDownButton
                onClick={levelDown}
                disabled={levelling}
            ></LevelDownButton>
            <div>Level {level}</div>
            <LevelUpButton
                onClick={levelUp}
                disabled={levelling}
            ></LevelUpButton>
        </LevelUpDiv>
    );
};

export default LevelUp;
