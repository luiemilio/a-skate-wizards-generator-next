'use client';
import { useContext, useEffect, useState } from 'react';
import LevelUp from './LevelUp';
import AttackBonus from './AttackBonus';
import { CharacterContext } from '../_lib/utils';
import styled from 'styled-components';

const StatusDiv = styled.div`
    display: flex;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
    padding-top: 16px;
    padding-bottom: 16px;
    margin-bottom: -20px;
    width: 100%;
    min-width: 450px;
    align-items: center;
    justify-content: space-evenly;
`;

const HpDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 52px;
`;

const DefenseDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 90px;
`

const StatusBar = () => {
    const { levelHistory, level, levelling } = useContext(CharacterContext);
    const [hp, setHp] = useState(0);
    const [defense, setDefense] = useState(0);

    useEffect(() => {
        const stats = levelHistory.get(level);

        if (stats) {
            const { hp, defense } = stats;
            
            setHp(hp);
            setDefense(defense);
        }
    }, [level, levelHistory, levelling]);

    return (
        <StatusDiv>
            <LevelUp></LevelUp>
            <HpDiv>{`HP: ${hp}`}</HpDiv>
            <DefenseDiv>{`Defense: ${defense}`}</DefenseDiv>
            <AttackBonus></AttackBonus>
        </StatusDiv>
    );
};

export default StatusBar;
