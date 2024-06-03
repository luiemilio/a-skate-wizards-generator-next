import { useContext, useEffect, useState } from 'react';
import { LevelUpButton } from './Buttons';
import { CharacterContext } from '../_lib/utils';
import styled from 'styled-components';

const AttackBonusDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 180px;
`;

const AttackBonusInfo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 60px;
`;

const AttackBonus = () => {
    const { level, levelling, levelHistory, setLevelling, updateLevelHistory, currentStats, setCurrentStats } =
        useContext(CharacterContext);

    const [attackBonus, setAttackBonus] = useState(0);

    const increaseAttackBonus = () => {
        const stats = levelHistory.get(level);

        if (stats) {
            updateLevelHistory(level, {
                ...stats,
                attackBonus: attackBonus + 1
            });
        }

        setLevelling(false);
    };

    useEffect(() => {
        const stats = levelHistory.get(level);

        if (stats) {
            const { attackBonus } = stats;
            setAttackBonus(attackBonus);
        }
    }, [level, levelHistory]);

    return (
        <AttackBonusDiv>
            <p>Attack Bonus</p>
            <AttackBonusInfo>
                <p>{attackBonus}</p>
                <LevelUpButton
                    onClick={increaseAttackBonus}
                    hidden={!levelling || level === 1 || level % 2 === 0}
                    disabled={!levelling || level === 1 || level % 2 === 0}
                ></LevelUpButton>
            </AttackBonusInfo>
        </AttackBonusDiv>
    );
};

export default AttackBonus;
