import { CharacterContext } from '../_lib/utils';
import { useContext } from 'react';
import { LevelUpButton, LevelDownButton } from './Buttons';
import styled from 'styled-components';

const LevelUpDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 130px;
    gap: 5px;
`;

const LevelUp = () => {
    const {
        level,
        levelling,
        setLevel,
        setLevelling,
        levelHistory,
        updateLevelHistory
    } = useContext(CharacterContext);

    const levelDown = () => {
        if (level > 1) {
            const newLevel = level - 1;
            console.log('setting level: ', newLevel);
            levelHistory.delete(level);
            setLevel(newLevel);
        }
    };

    const levelUp = () => {
        if (level < 7) {
            const newLevel = level + 1;
            console.log('setting level: ', newLevel);
            const currentStats = levelHistory.get(level);

            if (currentStats) {
                const newStats = { ...currentStats, hp: currentStats.hp + 2 };
                updateLevelHistory(newLevel, newStats);
            }

            setLevel(newLevel);
            setLevelling(true);
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
