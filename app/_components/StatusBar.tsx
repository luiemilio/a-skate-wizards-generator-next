'use client';
import { useContext, useEffect, useMemo, useState } from 'react';
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

const AnimatedImage = styled(Image)<{ $doTrick: boolean; $trick: string; animationid: string }>`
    animation: ${(props) => {
        if (props.$trick === 'front-flip' && props.$doTrick) {
            return `front-flip-${props.animationid} 2000ms`;
        }

        if (props.$trick === 'blast-off' && props.$doTrick) {
            return `blast-off-${props.animationid} 5000ms`;
        }

        return '';
    }};

    @keyframes ${(props) => `front-flip-${props.animationid}`} {
        0% {
            transform: translateX(0%) translateY(0%) rotate(0turn);
        }

        10% {
            transform: translateX(100%) translateY(-50%) rotate(1turn);
        }

        20% {
            transform: translateX(200%) translateY(-75%) rotate(2turn);
        }

        30% {
            transform: translateX(300%) translateY(-50%) rotate(3turn);
        }

        40% {
            transform: translateX(400%) translateY(-0%) rotate(0turn);
        }

        50% {
            transform: translateX(400%) translateY(-0%) rotate(0turn);
        }
    }

    @keyframes ${(props) => `blast-off-${props.animationid}`} {
        0% {
            transform: translateX(0%) translateY(0%) rotate(0turn);
        }

        50% {
            transform: translateX(0%) translateY(-1000%) rotate(2.5turn);
        }

        100% {
            transform: translateX(0%) translateY(0%) rotate(5turn);
        }
    }
`;

const AnimatedWizard = ({ animationid, src, alt, width, height, trick }: any) => {
    const [doTrick, setDoTrick] = useState(false);

    const onClick = () => {
        console.log('click');
        setDoTrick(true);
    };

    const onAnimationEnd = () => {
        console.log('animation end');
        setDoTrick(false);
    };

    return (
        <AnimatedImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            onClick={onClick}
            $trick={trick}
            $doTrick={doTrick}
            onAnimationEnd={onAnimationEnd}
            animationid={animationid}
        />
    );
};

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
            <AnimatedWizard
                animationid='chillWizard'
                src={chillWizardOnSkateBoard}
                alt='chill wizard'
                width={100}
                height={60}
                trick='front-flip'
            />
            <Status>
                <HpDiv>{`HP: ${hp}`}</HpDiv>
                <DefenseDiv>{`Defense: ${defense}`}</DefenseDiv>
                <AttackBonus></AttackBonus>
            </Status>
            <AnimatedWizard
                animationid='mushroomWizard'
                src={wizardOnMushroom}
                alt='mushroom wizard'
                width={50}
                height={50}
                trick='blast-off'
            />
        </StatusDiv>
    );
};

export default StatusBar;
