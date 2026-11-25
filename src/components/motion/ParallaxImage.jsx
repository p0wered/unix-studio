import {useRef} from 'react';
import {m, useReducedMotion, useScroll, useTransform} from 'motion/react';
import styles from './ParallaxImage.module.css';

/**
 * Background image that moves slower (negative speed) or faster than the page while its box crosses
 * the viewport. Same maths as react-scroll-parallax's <ParallaxBanner> + <ParallaxBannerLayer speed>:
 * the layer is taller by |speed|·10px on each side and moves from speed·10px to −speed·10px.
 */
export function ParallaxImage({image, speed, className}) {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();
    const {scrollYProgress} = useScroll({target: ref, offset: ['start end', 'end start']});
    const shift = speed * 10;
    const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [shift, -shift]);
    const overflow = -Math.abs(shift);

    return (
        <div ref={ref} className={className ? `${styles.banner} ${className}` : styles.banner}>
            {/* data-testid: frozen in the visual tests (depends on the scroll position) */}
            <m.div
                className={styles.layer}
                data-testid='parallax-layer'
                style={{backgroundImage: `url("${image}")`, top: overflow, bottom: overflow, y}}
            />
        </div>
    );
}
