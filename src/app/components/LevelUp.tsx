import styles from '../page.module.css';
import { Context } from '../page';
import { useContext, useEffect } from 'react';
import { LevelUpButton, LevelDownButton } from './Buttons';

const LevelUp = () => {
    const { level, levelling, setLevel, setLevelling  } = useContext(Context);
    
    const levelDown = () => {
        if (level > 1) {
            console.log('setting level: ', level - 1);
            setLevel(level - 1);
            setLevelling(true);
        }
    };

    const levelUp = () => {
        if (level < 7) {
            console.log('setting level: ', level + 1);
            setLevel(level + 1);
            setLevelling(true);
        }
    };

    return (
        <div className={styles.levelUp}>
            <LevelDownButton onClick={levelDown} disabled={levelling}></LevelDownButton>
            <div>Level {level}</div>
            <LevelUpButton onClick={levelUp} disabled={levelling}></LevelUpButton>
        </div>
    )
};

export default LevelUp;