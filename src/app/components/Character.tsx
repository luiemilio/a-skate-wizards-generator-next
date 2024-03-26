'use client';
import styles from '../page.module.css';
import { useContext, useState, useEffect } from 'react';
import Items from './Items';
import Abilities from './Abilities';
import { Context } from "../page";
import RandoSpells from './RandoSpells';
import { Item } from '../utils/utils';

const Character = () => {
    const { level, levelling, setLevel, setLevelling, statsMap, setStatsMap  } = useContext(Context);
    const [permSpells, setPermSpells] = useState<Item[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [bootlegSpells, setBootlegSpells] = useState<Item[]>([]);

    useEffect(() => {
        const currentStats = statsMap.get(level);

        if (currentStats) {
            const { permSpells, items, bootlegSpells } = currentStats;

            setPermSpells(permSpells);
            setItems(items);
            setBootlegSpells(bootlegSpells);
        }
    }, [level, statsMap]);

    return (
        <div className={styles.character}>
            <div className={styles.characterTop}>
                <Abilities></Abilities>
                <Items className={styles.permanentSpells} section='Permanent Spells' items={permSpells}></Items>
                <Items className={styles.items} section='Items' items={items}></Items>
            </div>
            <div className={styles.characterBottom}>
                <RandoSpells></RandoSpells>
                <Items section='Bootleg Spells' items={bootlegSpells}></Items>
            </div>
        </div>
    )
};

export default Character;