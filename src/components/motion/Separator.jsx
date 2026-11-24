import {Reveal} from './Reveal';
import styles from './Separator.module.css';

const GROW = {hidden: {scaleX: 0}, visible: {scaleX: 1}};
const GROW_TRANSITION = {duration: 0.8};

/** 1px line that grows from the centre when scrolled into view. `wide` drops the side margins. */
export function Separator({wide = false, dark = false}) {
    const className = [styles.separator, wide && styles.wide, dark && styles.dark].filter(Boolean).join(' ');
    return <Reveal className={className} variants={GROW} transition={GROW_TRANSITION}/>;
}
