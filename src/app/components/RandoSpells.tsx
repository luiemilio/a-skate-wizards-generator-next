import { useContext, useEffect, useState } from 'react';
import styles from '../page.module.css';
import { LevelUpButton } from './Buttons';
import { Context } from '../page';
import { Item, getRandoSpell } from '../utils/utils';

const RandoSpells = () => {
    const { level, levelling, setLevel, setLevelling, statsMap, setStatsMap } =
        useContext(Context);
    const [randoSpells, setRandoSpells] = useState<Item[]>([]);

    const addRandoSpell = () => {
        console.log('get rando spell');
        const randoSpell = getRandoSpell();
        const currentRandoSpells = randoSpells;
        currentRandoSpells.push(randoSpell);
        setRandoSpells(currentRandoSpells);
        setLevelling(false);
    };

    useEffect(() => {
        const currentStats = statsMap.get(level);

        if (currentStats) {
            const { randoSpells } = currentStats;

            setRandoSpells(randoSpells);
        }
    }, [level, statsMap]);

    return (
        <div className={`${styles.characterSection} ${randoSpells}`}>
            <div className={`${styles.randoSpellsHeader}`}>
                <div className={`${styles.sectionName}`}>{'Rando Spells'}</div>
                <LevelUpButton
                    onClick={addRandoSpell}
                    hidden={!levelling || level === 1 || level % 2 === 0}
                    disabled={!levelling || level === 1 || level % 2 === 0}
                ></LevelUpButton>
            </div>
            {randoSpells?.map((item: any) => {
                return (
                    <div key={item.name}>
                        <div className={styles.itemName}>{item.name}</div>
                        <div>{item.description}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default RandoSpells;
