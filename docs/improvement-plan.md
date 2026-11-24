# План улучшения UNIXSTUDIO

Цель — улучшить и оптимизировать проект, **не меняя дизайн**. Исключение: изменения внешнего вида допустимы, если это исправление бага (например, размытые растровые линии → чёткий вектор), и только так, чтобы визуально почти ничего не поменялось.

Статусы: `[x]` — сделано, `[ ]` — не сделано, `[~]` — сделано частично / перенесено.

---

## Фаза 0. Страховка от поломки дизайна ✅

- [x] Скриншотные тесты (Playwright) всех страниц на ширинах 375 / 860 / 1280 / 1600 с выключенными анимациями — `tests/visual/`, запуск `npm run test:visual`.
- [x] Эталонные скриншоты снимаются **до** любых изменений; после каждой фазы — повторный прогон и ручной просмотр диффов.

Как это устроено:
- `npm run test:visual` — сборка + сравнение со скриншотами в `tests/visual/__screenshots__` (сравнение строгое: любой изменённый пиксель — падение; отчёт с диффами — `npx playwright show-report tests/visual/report`).
- `npm run test:visual:update` — принять текущий вид как новый эталон (делать только после просмотра диффов).
- Эталоны не коммитятся (`.gitignore`): они зависят от ОС и шрифтового рендеринга. Чтобы снять эталон «как было», соберите нужный коммит и запустите `test:visual:update` на нём.
- Для стабильности в тестах: анимации framer-motion мгновенные (`window.__VISUAL_TEST__` → `MotionGlobalConfig.skipAnimations` в `src/index.js`), а бегущая строка, вращающийся бейдж, параллакс-слои и кастомный курсор заморожены/скрыты.

## Фаза 1. Баги ✅

- [x] `about-page.jsx`: локальная функция `Slider` перекрывает `react-slick` → бесконечная рекурсия `CasesSlider → Slider → CasesSlider`; одинаковые `key` у слайдов.
- [x] `home-page.jsx` (`ReviewSection`): `isInView2 = useInView(ref)` вместо `ref2`.
- [x] Один `ref` на двух элементах (`StatsItem`, ячейки статистики) — теперь ref на всей ячейке. *Видимое изменение (баг-фикс): подписи ячеек появляются вместе с ячейкой, а не когда в экран попадает только нижнее число.*
- [x] Пропущенные `key` (фрагменты в `map` в `App.js` и `case-page.jsx`, `StatsItem`).
- [x] `Link to='/error'` → `/services`; добавлен 404-маршрут; «Get in touch» без `href` → `Link` на `/contact`; карточки слайдера → `/cases`; «наверх» в футере — `<button>` вместо `<a href='#'>`.
- [x] Мёртвый код: `rotate`/`useTime` в Footer, `screenWidth` в `StatsSection`, неиспользуемые импорты и ассеты (`get-in-touch-footer.png`, `mask-review-2.jpg`, `logo.svg`).
- [x] `@font-face`: невалидный `format('ttf')` → решено в фазе 2 (остался только woff2).
- [x] Мобильное меню: `inert` + `aria-hidden` в закрытом состоянии, закрытие по Esc, по переходу (в т.ч. по логотипу) и при расширении окна до десктопа, блокировка прокрутки, `100dvh`.
- [x] Год в футере считается автоматически, `dribble.com` → `dribbble.com` (и подпись «Dribbble»), внешние ссылки с `target="_blank" rel="noopener noreferrer"`.
- [x] `alt` у картинок, на которые ругался линтер.
- [~] Фильтры на странице кейсов не фильтруют, счётчик «ALL [9]» не совпадает с 6 карточками, «VIEW ALL CASES» ведёт на `#` → перенесено в фазу 4 (делается вместе с выносом данных).

## Фаза 2. Картинки и шрифты ✅

- [x] Фоны Hero: линии и круг перерисованы вектором (`hero-lines.svg`, `hero-lines-dark.svg` — кривые восстановлены по исходным PNG с точностью ~0,1px, обводка 1px `non-scaling-stroke`, чёткая на любой ширине и на retina). Свечение — отдельным растром без линий (`hero-glow.webp`, `glow-lower.webp`). Было ~2,2 МБ PNG → 2 × ~10 КБ WebP + 2 × ~1 КБ SVG. *Видимое изменение (баг-фикс): линии стали тонкими и чёткими вместо размытых ~2px.*
- [x] Звёзды → SVG (`star.svg`, `star-dark.svg`, геометрия снята с исходников).
- [x] Остальные PNG/JPG → WebP (q80; зернистые `case_6` и `ai` — q94, чтобы не потерять зерно); `case_2` уменьшен с 3852px до 1260px (2× от 630px на экране).
- [x] `loading="lazy"` + `decoding="async"` для всего ниже первого экрана; `aspect-ratio`/`width`/`height` против CLS.
- [x] Шрифты: только woff2 в `public/fonts/`, `<link rel="preload">` и `@font-face` в `public/index.html` (CRA не умеет абсолютные `url()` в CSS). Hubot Sans: латиница + пунктуация, оси ширины и наклона зафиксированы (170 КБ → 38 КБ, рендеринг попиксельно тот же — важно сохранять имена глифов, `--glyph-names`). Panchang оставлен как есть (лицензия ITF, выигрыш всего 5 КБ).
- [x] `img.png` для README (5,7 МБ) → `docs/preview.webp` (350 КБ).

Итог фазы 2: медиа в сборке 9,8 МБ → 0,6 МБ; JS 142 → 126 КБ gzip (CRA встраивает мелкие картинки в бандл, а они стали в разы меньше).

Осталось на потом:
- Фоновые картинки задаются inline-стилями из React, поэтому браузер узнаёт о них только после загрузки JS — preload для фона Hero будет иметь смысл после перехода на Vite/пререндер (фазы 3, 7).
- Картинки параллакса (`haven`, `footer`) — CSS-фоны `react-scroll-parallax`, нативный `loading="lazy"` к ним не применим; можно грузить через IntersectionObserver в фазе 6.

## Фаза 3. Сборка и зависимости

- [ ] CRA (deprecated) → Vite.
- [ ] React 19, `framer-motion` → `motion` v12, `react-router` v7.
- [ ] Убрать `@motionone/utils`, `resize-observer-polyfill`, `web-vitals`; `hamburger-react` → dependencies, testing-library → devDependencies.
- [ ] CSS `slick` с CDN (блокирует рендер) → из npm, или заменить `react-slick` на Embla Carousel со стилями один в один.
- [ ] Code splitting по маршрутам (`React.lazy`).

## Фаза 4. Архитектура компонентов

- [ ] Примитив `<Reveal>` на `whileInView` вместо ~40 копий `useRef + useInView + initial/animate/transition`; общая константа easing.
- [ ] Общий `<Hero>` вместо трёх копий `TitleSection`.
- [ ] Данные отдельно от разметки (`src/data/`): кейсы, услуги, статистика, соцсети, навигация. Карточки кейсов и рабочие фильтры через `map`.
- [ ] Убрать циклический импорт `Footer` из `App.js` → `components/layout/`.
- [ ] Один `ParallaxProvider` на корне; один `<ScrollToTop>` в роутере.
- [ ] Структура: `app/`, `pages/`, `components/{layout,motion,ui}/`, `data/`, `styles/`.

## Фаза 5. CSS

- [ ] Inline-стили → классы; захардкоженные цвета (`#7c7c7c`, `#808080`, `#484848`, `#bdbdbd`) → токены.
- [ ] Разбить глобальный CSS по компонентам (CSS Modules), медиазапросы рядом с правилами.
- [ ] Удалить неиспользуемые классы (проверить через PurgeCSS), убрать хрупкие селекторы (`.cases-grid-item div`).
- [ ] `100vh` в Hero → `100svh`.

## Фаза 6. Производительность анимаций

- [ ] Вращение «Get in touch» через `useTime` → CSS `@keyframes`.
- [ ] `ParallaxText` — пауза rAF вне viewport.
- [ ] `AnimatedHeadingWords` — variants со `staggerChildren` на родителе вместо отдельного наблюдателя на каждую букву.
- [ ] Кастомный курсор выключать на тач-устройствах.
- [ ] `<MotionConfig reducedMotion="user">`.

## Фаза 7. Доступность и SEO

- [ ] `*:focus { outline: none }` → `:focus-visible`.
- [ ] Побуквенные заголовки: `aria-label` на обёртке, `aria-hidden` на буквах.
- [ ] Семантика (`main`, `section`, иерархия заголовков), осмысленные `alt`.
- [ ] `title`/`description`/OG для каждой страницы, пререндер в статический HTML.
- [ ] `manifest.json`: имя, иконки (нет `logo512.png`), `theme_color`.

## Фаза 8. DX и поддержка

- [ ] ESLint + Prettier, единый стиль отступов; по желанию TypeScript.
- [ ] CI: скриншотные тесты, Lighthouse CI, бюджеты размера.
- [ ] Убрать `.idea/` из репозитория, обновить README.
- [ ] Опечатки в текстах: «Dont’t», «glimse», «TESTIMONAL», «forearly-stage», «owning to», «BALLIAT».
