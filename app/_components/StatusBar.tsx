'use client';
import { useContext, useEffect, useState } from 'react';
import styles from '../page.module.css';
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
    align-items: center;
    justify-content: space-around;
`;

const StatusBar = () => {
    const [stats, setStats] = useState({ hp: 0, defense: 0, attackBonus: 0 });
    const { statsMap, level, levelling } = useContext(CharacterContext);

    useEffect(() => {
        const currentStats = statsMap.get(level);

        if (currentStats) {
            const { hp, defense, attackBonus } = currentStats;
            setStats({ hp, defense, attackBonus });
        }
    }, [level, statsMap, levelling]);

    return (
        <StatusDiv>
            <LevelUp></LevelUp>
            <div>{`HP: ${stats?.hp}`}</div>
            <div>{`Defense: ${stats?.defense}`}</div>
            <AttackBonus></AttackBonus>
        </StatusDiv>
    );
};

export default StatusBar;
