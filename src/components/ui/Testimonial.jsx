import {useRef} from 'react';
import {useInView} from 'motion/react';
import {Reveal} from '../motion/Reveal';
import {REVEAL_UP_SHORT} from '../motion/presets';
import QuoteMark from '../../assets/review.svg';
import styles from './Testimonial.module.css';

/**
 * Quote mark + quote + author. The quote mark follows the quote text into view;
 * the author row slides in a bit later on its own.
 *
 * size: 'small' (72px avatar) or 'large' (140px avatar, smaller role caption)
 */
export function Testimonial({review, size = 'small'}) {
    const quoteRef = useRef(null);
    const quoteInView = useInView(quoteRef);
    const large = size === 'large';

    return (
        <div className={styles.testimonial}>
            <Reveal
                as='img'
                className={styles.quote}
                src={QuoteMark}
                alt=''
                draggable={false}
                variants={REVEAL_UP_SHORT}
                inView={quoteInView}
            />
            <div className={styles.body}>
                <Reveal as='blockquote' ref={quoteRef} className='h4 change-font' inView={quoteInView}>
                    {review.quote}
                </Reveal>
                <Reveal delay={0.3} className={styles.author}>
                    <img
                        src={review.avatar}
                        alt={review.name}
                        className={large ? styles.avatarLarge : styles.avatarSmall}
                        loading='lazy'
                        decoding='async'
                        draggable={false}
                    />
                    <div>
                        <p>{review.name}</p>
                        <p className={`change-font ${styles.role} ${large ? styles.compact : ''}`}>{review.role}</p>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
