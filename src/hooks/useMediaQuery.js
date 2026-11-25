import {useCallback, useSyncExternalStore} from 'react';

/** `true` while the media query matches; re-renders only when the match changes. */
export function useMediaQuery(query) {
    const subscribe = useCallback(
        (onChange) => {
            const mq = window.matchMedia(query);
            mq.addEventListener('change', onChange);
            return () => mq.removeEventListener('change', onChange);
        },
        [query],
    );
    return useSyncExternalStore(
        subscribe,
        () => window.matchMedia(query).matches,
        () => false,
    );
}
