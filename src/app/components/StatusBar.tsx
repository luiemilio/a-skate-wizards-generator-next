import { useContext, useEffect, useState } from 'react';
import styles from '../page.module.css';
import { CharacterContext } from '../page';
import LevelUp from './LevelUp';

const StatusBar = () => {
    const [status, setStatus] = useState({ hp: 0, defense: 0, attackBonus: 0});
    const levelMap = useContext(CharacterContext);
    const currentLevel = levelMap.get('currentLevel');
    const currentStats = levelMap.get(currentLevel);

    useEffect(() => {
        if (currentLevel) {
            if (currentStats) {
                const { attackBonus, hp, defense } = currentStats;
                setStatus({ attackBonus, hp, defense })
            }
        }
    }, [currentLevel, currentStats]);

    return (
        <div className={styles.statusBar}>
            <LevelUp></LevelUp>
            <div className={styles.hp}>{`HP: ${status?.hp}`}</div>
            <div className={styles.defense}>{`Defense: ${status?.defense}`}</div>
            <div className={styles.attackBonus}>{`Attack Bonus: ${status?.attackBonus}`}</div>
        </div>
    )
};

export default StatusBar;