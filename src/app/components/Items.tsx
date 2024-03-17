import styles from '../page.module.css';

const Items = ({ section, items, className }: any) => {
    return (
        <div className={`${styles.characterSection} ${className}`}>
            <div className={`${styles.sectionName}`}>{section}</div>
            {items?.map((item: any) => {
                return (
                    <div key={item.name}>
                        <div className={styles.itemName}>{item.name}</div>
                        <div>{item.description}</div>
                    </div>
                )
            })}
        </div>
    )
};

export default Items;