import { useContext, useEffect, useState } from 'react';
import styles from '../page.module.css';
import { LevelUpButton } from './Buttons';
import { CharacterContext } from '../_lib/utils';
import styled from 'styled-components';

const AttackBonusDiv = styled.div`
    display: flex;
    gap: 5px;
    width: 166px;
    align-items: center;
`;

const AttackBonus = () => {
    const { level, levelling, statsMap, setLevelling } =
        useContext(CharacterContext);
    const [attackBonus, setAttackBonus] = useState(0);

    const increaseAttackBonus = () => {
        console.log('increase attack bonus');
        const currentStats = statsMap.get(level);

        if (currentStats) {
            const newAttackBonus = attackBonus + 1;
            currentStats.attackBonus = newAttackBonus;
            setAttackBonus(newAttackBonus);
        }

        setLevelling(false);
    };

    useEffect(() => {
        const currentStats = statsMap.get(level);

        if (currentStats) {
            const { attackBonus } = currentStats;
            setAttackBonus(attackBonus);
        }
    }, [level, statsMap]);

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
