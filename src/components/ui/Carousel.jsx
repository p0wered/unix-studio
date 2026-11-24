import {useCallback} from 'react';
import {Link} from 'react-router';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './Carousel.module.css';

const OPTIONS = {loop: true, align: 'start'};

/**
 * Looping, draggable row of case cards. Clicking a card scrolls it into place.
 *
 * items: [{title, image, subtitle?, to?}]
 */
export function Carousel({items}) {
    const [viewportRef, embla] = useEmblaCarousel(OPTIONS);

    // Embla swallows the click that ends a drag, so this only fires on real clicks
    const select = useCallback((index) => embla?.scrollTo(index), [embla]);

    return (
        <div className={styles.carousel}>
            <div className={styles.viewport} ref={viewportRef}>
                <div className={styles.container}>
                    {items.map((item, i) => (
                        <div className={styles.slide} key={`${item.title}-${i}`} onClick={() => select(i)}>
                            <div className={styles.card}>
                                <img
                                    className={styles.image}
                                    src={item.image}
                                    alt={item.title}
                                    loading='lazy'
                                    decoding='async'
                                    draggable={false}
                                />
                                <div className={styles.caption}>
                                    {item.to
                                        ? <Link to={item.to} className={`primary-link ${styles.title}`}>{item.title}</Link>
                                        : <p className={`primary-link ${styles.title}`}>{item.title}</p>}
                                    {item.subtitle && <p className={`change-font ${styles.subtitle}`}>{item.subtitle}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
