import {useSyncExternalStore} from 'react';

const noop = () => () => {};

/**
 * false during the server render and while hydrating the prerendered HTML, true afterwards.
 * For values the static HTML can't know (e.g. the query string), so hydration matches the HTML first.
 */
export function useHydrated() {
    return useSyncExternalStore(
        noop,
        () => true,
        () => false,
    );
}
