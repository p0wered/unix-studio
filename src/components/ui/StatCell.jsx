import {Reveal, RevealItem} from '../motion/Reveal';
import {GROUP} from '../motion/presets';

/** One cell of the stats grid: caption on top, big number at the bottom; both slide in with the cell. */
export function StatCell({stat, className = '', minHeight, ref, inView}) {
    return (
        <Reveal
            ref={ref}
            inView={inView}
            variants={GROUP}
            className={`stats-item ${className}`.trim()}
            style={minHeight ? {minHeight} : undefined}
        >
            <RevealItem as='p' className='change-font'>{stat.title}</RevealItem>
            <RevealItem as='h3'>{stat.value}</RevealItem>
        </Reveal>
    );
}
