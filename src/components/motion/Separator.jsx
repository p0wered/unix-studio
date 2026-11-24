import {Reveal} from './Reveal';

const GROW = {hidden: {scaleX: 0}, visible: {scaleX: 1}};
const GROW_TRANSITION = {duration: 0.8};

/** 1px line that grows from the centre when scrolled into view. `wide` drops the side margins. */
export function Separator({wide = false, dark = false}) {
    const style = {
        ...(dark && {backgroundColor: 'var(--border-dark)'}),
        ...(wide && {margin: 0}),
    };
    return <Reveal className='separator' variants={GROW} transition={GROW_TRANSITION} style={style}/>;
}
