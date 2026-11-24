import styles from './UnderConstruction.module.css';

/** Placeholder for pages that aren't designed yet. */
export function UnderConstruction({title = 'Under construction', children}) {
    return (
        <div className={styles.page}>
            <h1 className={`change-font ${styles.title}`}>{title}</h1>
            {children}
        </div>
    );
}
