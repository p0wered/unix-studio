import {Link} from 'react-router';
import {Reveal, RevealItem} from '../motion/Reveal';
import {GROUP} from '../motion/presets';
import styles from './StatCell.module.css';

const cx = (...classes) => classes.filter(Boolean).join(' ');

/**
 * One cell of the stats grid: caption on top, big number at the bottom; both slide in with the cell.
 *
 * tall: taller cell (first row); wide: spans two columns; leftColumn: no left border on tablets
 */
export function StatCell({stat, tall, wide, leftColumn, ref, inView}) {
    return (
        <Reveal
            ref={ref}
            inView={inView}
            variants={GROUP}
            className={cx(styles.cell, tall && styles.tall, wide && styles.wide, leftColumn && styles.leftColumn)}
        >
            <RevealItem as='p' className='change-font'>{stat.title}</RevealItem>
            <RevealItem as='h3'>{stat.value}</RevealItem>
        </Reveal>
    );
}

/** The tall "Get in touch" cell at the start of the grid. */
export function StatContactCell() {
    return (
        <div className={cx(styles.cell, styles.aside)}>
            <p></p>
            <Link to='/contact' className='change-font primary-link'>Get in touch</Link>
        </div>
    );
}
