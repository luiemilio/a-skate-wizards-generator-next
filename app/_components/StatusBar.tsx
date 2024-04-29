'use client';
import { useContext, useEffect, useState } from 'react';
import AttackBonus from './AttackBonus';
import { CharacterContext } from '../_lib/utils';
import styled from 'styled-components';
import Image from 'next/image';
import chillWizardOnSkateBoard from '../_assets/images/wizardchillonskateboard.png';
import wizardOnMushroom from '../_assets/images/wizardonmushroom.png';

const StatusDiv = styled.div`
    display: flex;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
    padding: 10px;
    width: 100%;
    min-width: 450px;
    align-items: center;
    justify-content: space-between;
`;

const HpDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const DefenseDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const Status = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 900px;
`;

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
            <Image src={chillWizardOnSkateBoard} alt='chill wizard' width={100} height={60} />
            <Status>
                <HpDiv>{`HP: ${hp}`}</HpDiv>
                <DefenseDiv>{`Defense: ${defense}`}</DefenseDiv>
                <AttackBonus></AttackBonus>
            </Status>
            <Image src={wizardOnMushroom} alt='wizard on mushroom' width={50} height={50} />
        </StatusDiv>
    );
};

export default StatusBar;
