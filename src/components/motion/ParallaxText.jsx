import {useEffect, useRef} from "react";
import {
    cancelFrame,
    frame,
    m,
    useInView,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    wrap,
} from "motion/react";
import styles from "./ParallaxText.module.css";

/**
 * Endless marquee whose speed and direction follow the page scroll velocity.
 * Runs only while it is on screen, and stands still for "reduce motion".
 */
export function ParallaxText({ children, baseVelocity = 100 }) {
    const ref = useRef(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();

    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -40, v)}%`);
    const directionFactor = useRef(1);

    useEffect(() => {
        if (!inView || reduceMotion) return;

        const step = ({ delta }) => {
            let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

            // This is what changes the direction of the scroll once we
            // switch scrolling directions.
            if (velocityFactor.get() < 0) {
                directionFactor.current = -1;
            } else if (velocityFactor.get() > 0) {
                directionFactor.current = 1;
            }

            moveBy += directionFactor.current * moveBy * velocityFactor.get();

            baseX.set(baseX.get() + moveBy);
        };

        frame.update(step, true);
        return () => cancelFrame(step);
    }, [inView, reduceMotion, baseVelocity, baseX, velocityFactor]);

    return (
        // decorative: the same word repeated, hidden from screen readers
        <div ref={ref} className={styles.parallax} aria-hidden="true">
            {/* data-testid: frozen in the visual tests (moves every frame) */}
            <m.div className={styles.scroller} style={{x}} data-testid="marquee">
                <span>{children}</span>
                <span>{children}</span>
                <span>{children}</span>
                <span>{children}</span>
                <span>{children}</span>
            </m.div>
        </div>
    );
}
