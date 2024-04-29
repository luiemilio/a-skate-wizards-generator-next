import { useContext, useEffect, useState } from 'react';
import styles from '../page.module.css';
import { LevelUpButton } from './Buttons';
import { CharacterContext } from '../_lib/utils';
import styled from 'styled-components';

const AttackBonusDiv = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
`;

const AttackBonus = () => {
    const { level, levelling, levelHistory, setLevelling, updateLevelHistory } =
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
            <div>{`Attack Bonus: ${attackBonus}`}</div>
            <LevelUpButton
                onClick={increaseAttackBonus}
                hidden={!levelling || level === 1 || level % 2 === 0}
                disabled={!levelling || level === 1 || level % 2 === 0}
            ></LevelUpButton>
        </AttackBonusDiv>
    );
};

export default AttackBonus;
