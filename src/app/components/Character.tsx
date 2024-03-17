import styles from '../page.module.css';
import { CharacterContext } from '../page';
import { useContext, useState, useEffect } from 'react';
import Items from './Items';
import Abilities from './Abilities';

const Character = () => {
    const [status, setStatus] = useState({} as any);
    const levelMap = useContext(CharacterContext);
    const currentLevel = levelMap.get('currentLevel');
    const currentStats = levelMap.get(currentLevel);

    useEffect(() => {
        if (currentLevel) {
            if (currentStats) {
                const { abilityScores, permSpells, items, randoSpells, bootlegSpells } = currentStats;
                setStatus({ abilityScores, permSpells, items, randoSpells, bootlegSpells });
            }
        }
    }, [currentLevel, currentStats]);

    return (
        <div className={styles.character}>
            <div className={styles.characterTop}>
                <Abilities abilityScores={status.abilityScores}></Abilities>
                <Items className={styles.permanentSpells} section='Permanent Spells' items={status?.permSpells}></Items>
                <Items className={styles.items} section='Items' items={status?.items}></Items>
            </div>
            <div className={styles.characterBottom}>
                <Items className={styles.randoSpells} section='Rando Spell' items={status?.randoSpells}></Items>
                <Items section='Bootleg Spells' items={status?.bootlegSpells}></Items>
            </div>
        </div>
    )
};

export default Character;