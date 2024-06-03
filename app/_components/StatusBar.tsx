'use client';
import { useContext, useEffect, useState } from 'react';
import AttackBonus from './AttackBonus';
import { CharacterContext, CurrentStatTypes, CurrentStats, textFont } from '../_lib/utils';
import styled from 'styled-components';
import Abilities from './Abilities';

const StatusDiv = styled.div`
    display: flex;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
    padding: 10px;
    width: 100%;
    min-width: 450px;

    * {
        font-size: 1em;
    }
`;

const Status = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 180px;
    gap: 5px;

    * {
        padding: 0px;
    }
`;

const StatusInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 30px;
    gap: 5px;
`;

const BufferDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60px;
`;

const StatusInput = styled.input`
    width: 25px;
    height: 22px;
    text-align: center;
    border: 1px solid black;
    border-radius: 4px;
`;

const StatusNameP = styled.p`
    width: 116px;
`;

const StatusIndicator = () => {
    const { currentStats, setCurrentStats, levelHistory, level } = useContext(CharacterContext);

    const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentTarget = e.currentTarget;
        const stat = currentTarget.id as CurrentStatTypes;
        const value = parseInt(currentTarget.value);

        if (stat && value) {
            const newCurrentStats = { ...currentStats };
            newCurrentStats[stat] = value;
            setCurrentStats(newCurrentStats);
        }
    };

    return (
        <Status>
            <StatusInfo>
                <StatusNameP>HP</StatusNameP>
                <BufferDiv>
                    <StatusInput
                        className={textFont.className}
                        id='hp'
                        defaultValue={currentStats.hp}
                        onChange={updateState}
                    />
                    <p>/ {levelHistory.get(level)?.hp}</p>
                </BufferDiv>
            </StatusInfo>
            <StatusInfo>
                <StatusNameP>Defense</StatusNameP>
                <BufferDiv>
                    <p>{levelHistory.get(level)?.defense}</p>
                </BufferDiv>
            </StatusInfo>
            <AttackBonus />
        </Status>
    );
};

const AbilitiesDiv = () => {
    return (
        <Status>
            <Abilities />
        </Status>
    );
};

const Stats = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
`;

const StatusBar = () => {
    return (
        <StatusDiv>
            <Stats>
                <AbilitiesDiv />
                <StatusIndicator />
            </Stats>
        </StatusDiv>
    );
};

export default StatusBar;
