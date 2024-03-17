import styles from '../page.module.css';
import { CharacterContext } from '../page';
import { useContext } from 'react';

const LevelUp = () => {
    return (
        <div className={styles.levelUp}>
            <div className={styles.button}>-</div>
            <div> Level Up</div>
            <div className={styles.button}>+</div>
        </div>
    )
};

export default LevelUp;