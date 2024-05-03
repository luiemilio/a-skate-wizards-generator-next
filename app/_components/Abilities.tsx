import { useCallback, useContext, useEffect, useState } from 'react';
import { LevelUpButton } from './Buttons';
import { CharacterContext, normalizePropName } from '../_lib/utils';
import styled from 'styled-components';
import { ItemName } from './Items';
import { Section, SectionName } from './Section';

type Ability = 'strength' | 'dexterity' | 'will';

const ABILITIES: Ability[] = ['strength', 'will', 'dexterity'];

const Ability = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 180px;
`;

export const AbilityName = styled.p``;

const Score = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50px;
`;

const ScoreDiv = ({ ability }: { ability: Ability }) => {
    const { level, levelling, setLevelling, levelHistory, updateLevelHistory } =
        useContext(CharacterContext);

    const getScore = useCallback(() => {
        const stats = levelHistory.get(level);

        if (!stats) {
            return 0;
        }

        const { abilityScores } = stats;
        return abilityScores[ability];
    }, [ability, level, levelHistory]);

    const [score, setScore] = useState(0);

    const handleButtonClick = () => {
        const newScore = score + 1;
        const stats = levelHistory.get(level);

        if (stats) {
            const { abilityScores } = stats;
            const newAbilityScores = { ...abilityScores, [ability]: newScore };
            const newStats = {
                ...stats,
                abilityScores: { ...newAbilityScores }
            };
            updateLevelHistory(level, newStats);
        }

        setLevelling(false);
    };

    useEffect(() => {
        setScore(getScore());
    }, [getScore]);

    return (
        <Score>
            <div>{score}</div>
            <LevelUpButton
                onClick={handleButtonClick}
                hidden={!levelling || level === 1 || level % 2 !== 0}
                disabled={!levelling || level === 1 || level % 2 !== 0}
            ></LevelUpButton>
        </Score>
    );
};

const Abilities = () => {
    return (
        <>
            {ABILITIES.map((ability: Ability) => {
                return (
                    <Ability key={ability}>
                        <AbilityName>{normalizePropName(ability)}</AbilityName>
                        <ScoreDiv ability={ability}></ScoreDiv>
                    </Ability>
                );
            })}
        </>
    );
};

export default Abilities;
