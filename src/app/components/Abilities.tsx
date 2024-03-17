import styles from '../page.module.css';

const Abilities = ({ abilityScores }: any) => {
    const getAbilityScores = () => {
        if (abilityScores) {
            return Object.entries(abilityScores).map(([ability, score]) => {
                return (
                    <div key={ability}>{`${ability} ${score}`}</div>
                )
            })
        }
    }

    return (
        <div className={`${styles.characterSection} ${styles.abilities}`}>
            <div className={`${styles.sectionName}`}>Abilities</div>
            {getAbilityScores()}
        </div>
    )
};

export default Abilities;