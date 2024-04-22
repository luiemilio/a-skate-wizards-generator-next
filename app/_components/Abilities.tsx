import { useCallback, useContext, useEffect, useState } from 'react';
import { LevelUpButton } from './Buttons';
import { CharacterContext } from '../_lib/utils';
import styled from 'styled-components';
import { ItemName } from './Items';
import { Section, SectionName } from './Section';

type Ability = 'strength' | 'dexterity' | 'will';

const AbilitiesDiv = styled(Section)`
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
        <AbilitiesDiv>
            <SectionName>Abilities</SectionName>
            <ScoresDiv>
                <Ability>
                    <ItemName>Strength</ItemName>
                    <ScoreDiv ability='strength'></ScoreDiv>
                </Ability>
                <Ability>
                    <ItemName>Will</ItemName>
                    <ScoreDiv ability='will'></ScoreDiv>
                </Ability>
                <Ability>
                    <ItemName>Dexterity</ItemName>
                    <ScoreDiv ability='dexterity'></ScoreDiv>
                </Ability>
            </ScoresDiv>
        </AbilitiesDiv>
    );
};

export default Abilities;
