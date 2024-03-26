
'use client';
import { useContext, useEffect, useState } from "react";
import styles from "../page.module.css";
import { LevelDownButton, LevelUpButton } from "./Buttons";
import { Context } from "../page";

type Ability = 'strength' | 'dexterity' | 'will';

const Abilities = () => {
    const { level, levelling, setLevelling, statsMap } = useContext(Context);
    const [abilityScores, setAbilityScores] = useState({ strength: 0, dexterity: 0, will: 0 });

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
                    <div key={ability} className={styles.ability}>
                        <div className={styles.itemName}>
                            {`${ability}`.toLocaleUpperCase()}
                        </div>

                        <div className={styles.score}>
                            <div>{`${score}`}</div>
                            <LevelUpButton 
                                onClick={() => handleButtonClick(ability as Ability )}
                                hidden={!levelling || (level === 1 || level % 2 !== 0)}
                                disabled={!levelling || (level === 1 || level % 2 !== 0)}
                            ></LevelUpButton>
                        </div>
                    </div>
                );
            });
        }
    };

    return (
        <div className={`${styles.characterSection} ${styles.abilities}`}>
            <div className={`${styles.sectionName}`}>Abilities</div>
            <div className={styles.abilitiesDiv}>{getAbilityScores()}</div>
        </div>
    );
};

export default Abilities;
