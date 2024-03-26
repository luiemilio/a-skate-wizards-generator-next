import { useContext, useEffect, useState } from "react";
import styles from "../page.module.css";
import { LevelUpButton } from "./Buttons";
import { Context } from "../page";

const AttackBonus = () => {
    const { level, levelling, statsMap, setLevelling } = useContext(Context);
     const [attackBonus, setAttackBonus] = useState(0);

     useEffect(() => {
        const currentStats = statsMap.get(level);

        if (currentStats) {
            const { attackBonus } = currentStats;
            setAttackBonus(attackBonus);
        }
     }, [level, statsMap]);

    const increaseAttackBonus = () => {
        console.log('increase attack bonus');
        setLevelling(false);
    };

    return (
        <div className={styles.attackBonusDiv}>
            <div
                className={styles.attackBonus}
            >{`Attack Bonus: ${attackBonus}`}</div>
            <LevelUpButton
                onClick={increaseAttackBonus}
                hidden={!levelling || (level === 1 || level % 2 === 0)}
                disabled={!levelling || (level === 1 || level % 2 === 0)}
            ></LevelUpButton>
        </div>
    )
};

export default AttackBonus;