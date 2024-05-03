'use client';
import { useContext, useEffect, useState } from 'react';
import AttackBonus from './AttackBonus';
import { CharacterContext } from '../_lib/utils';
import styled from 'styled-components';
import Abilities from './Abilities';
import LevelUp from './LevelUp';

const StatusDiv = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
    padding: 10px;
    width: 100%;
    min-width: 450px;
    align-items: center;
    justify-content: space-evenly;
    gap: 5px;
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

    * {
        padding: 0px;
    }
`;

const StatusInfo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const BufferDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50px;
`;

const StatusIndicator = ({ hp, defense }: any) => {
    return (
        <Status>
            <StatusInfo>
                <p>HP</p>
                <BufferDiv>
                    <p>{hp}</p>
                </BufferDiv>
            </StatusInfo>
            <StatusInfo>
                <p>Defense</p>
                <BufferDiv>
                    <p>{defense}</p>
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
    gap: 10px;
    justify-content: space-evenly;
    width: 100%;
`;

const StatusBar = () => {
    const { levelHistory, level, levelling, name } = useContext(CharacterContext);
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
            <Stats>
                <AbilitiesDiv />
                <StatusIndicator hp={hp} defense={defense} />
            </Stats>
        </StatusDiv>
    );
};

export default StatusBar;
