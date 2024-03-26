'use client';
import { useContext, useEffect, useState } from "react";
import styles from "../page.module.css";
import LevelUp from "./LevelUp";
import { Context } from "../page";
import AttackBonus from "./AttackBonus";

const StatusBar = () => {
    const [stats, setStats] = useState({ hp: 0, defense: 0, attackBonus: 0 });
    const { statsMap, level, levelling  } = useContext(Context);
    
    useEffect(() => {
        const currentStats = statsMap.get(level);

        if (currentStats) {
            const { hp, defense, attackBonus } = currentStats;
            setStats({ hp, defense, attackBonus });
        }
    }, [level, statsMap, levelling]);

    return (
        <div className={styles.statusBar}>
            <LevelUp></LevelUp>
            <div className={styles.hp}>{`HP: ${stats?.hp}`}</div>
            <div className={styles.defense}>{`Defense: ${stats?.defense}`}</div>
            <AttackBonus></AttackBonus>
        </div>
    );
};

export default StatusBar;
