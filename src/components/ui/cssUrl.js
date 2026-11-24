/** `url("...")` for inline backgrounds. The quotes matter: Vite inlines small SVGs as data: URLs. */
export const cssUrl = (...urls) => urls.map((u) => `url("${u}")`).join(', ');
