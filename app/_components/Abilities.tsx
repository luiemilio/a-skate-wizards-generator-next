import { useContext, useEffect, useState } from 'react';
// import styles from "../page.module.css";
import { LevelUpButton } from './Buttons';
import { CharacterContext } from '../_lib/utils';
import styled from 'styled-components';
import { SectionName } from './Character';
import { ItemName } from './Items';

type Ability = 'strength' | 'dexterity' | 'will';

const AbilitiesDiv = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 350px;
    width: 450px;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    @media all and (max-width: 899px) {
        border-right: 0px solid black;
    }
`;

const ScoresDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Ability = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
`;

const Score = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70px;
`;

const Abilities = () => {
    const { level, levelling, setLevelling, statsMap } =
        useContext(CharacterContext);
    const [abilityScores, setAbilityScores] = useState({
        strength: 0,
        dexterity: 0,
        will: 0
    });

    const handleButtonClick = (ability: Ability) => {
        const currentAbilityScores = abilityScores;
        currentAbilityScores[ability] = currentAbilityScores[ability] + 1;
        const currentStats = statsMap.get(level);

        if (currentStats) {
            currentStats.abilityScores = currentAbilityScores;
        }

        setLevelling(false);
    };

    useEffect(() => {
        const currentStats = statsMap.get(level);

        if (currentStats) {
            const { abilityScores } = currentStats;

            setAbilityScores(abilityScores);
        }
    }, [level, statsMap]);

    const getAbilityScores = () => {
        if (abilityScores) {
            return Object.entries(abilityScores).map(([ability, score]) => {
                return (
                    <Ability key={ability}>
                        <ItemName>{`${ability}`.toLocaleUpperCase()}</ItemName>

                        <Score>
                            <div>{`${score}`}</div>
                            <LevelUpButton
                                onClick={() =>
                                    handleButtonClick(ability as Ability)
                                }
                                hidden={
                                    !levelling || level === 1 || level % 2 !== 0
                                }
                                disabled={
                                    !levelling || level === 1 || level % 2 !== 0
                                }
                            ></LevelUpButton>
                        </Score>
                    </Ability>
                );
            });
        }
    };

    return (
        <AbilitiesDiv>
            <SectionName>Abilities</SectionName>
            <ScoresDiv>{getAbilityScores()}</ScoresDiv>
        </AbilitiesDiv>
    );
};

export default Abilities;
