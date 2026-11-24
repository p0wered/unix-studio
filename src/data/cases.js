import Haven from '../assets/haven.webp';
import Baillat from '../assets/case_2.webp';
import Elektra from '../assets/case_3.webp';
import Stenger from '../assets/case_4.webp';
import Carlton from '../assets/case_5.webp';
import Ethnocare from '../assets/case_6.webp';
import Pangram from '../assets/case_7.webp';
import ElektraRound from '../assets/cases-page-1.webp';
import BaillatRound from '../assets/cases-page-2.webp';
import StengerRound from '../assets/cases-page-3.webp';

/** The big parallax project on the home page. */
export const HIGHLIGHT_PROJECT = {
    title: 'Haven Studios',
    subject: 'Gaming',
    image: Haven,
    url: 'https://havenstudios.com/en',
};

/** Cards in the home page carousel. */
export const CAROUSEL_CASES = [
    {title: 'Elektra', subtitle: 'Art and Culture', image: Elektra, to: '/cases'},
    {title: 'Baillat Studio', subtitle: 'Design', image: Baillat, to: '/cases'},
    {title: 'Stenger Bike', subtitle: 'Sport', image: Stenger, to: '/cases'},
    {title: 'Carlton Villa', subtitle: 'Estate', image: Carlton, to: '/cases'},
    {title: 'Ethnocare', subtitle: 'Medical', image: Ethnocare, to: '/cases'},
    {title: 'Pangram', subtitle: 'Typography', image: Pangram, to: '/cases'},
];

/** Filter buttons on the cases page, in display order. Categories without cases are hidden. */
export const CASE_CATEGORIES = [
    {id: 'design', label: 'DESIGN'},
    {id: 'business', label: 'BUSINESS'},
    {id: 'sport', label: 'SPORT'},
    {id: 'estate', label: 'ESTATE'},
    {id: 'other', label: 'OTHER'},
];

export const FEATURED_TEXT =
    'We build engaging user experience forearly-stage startups by connecting thedots between users’ needs and theclient’s business model.';

const ELEKTRA_TEXT =
    'The Elektra Virtual Museum (EVM) goes far beyond the traditional definition of a museum, as it is accessible everywhere, by everyone. By building this museum, ELEKTRA aims to share its 20 years of expertise in the field of media arts and offer visitors a unique experience.';

const STENGER_TEXT =
    'Admittedly, the purpose and technology of the "drahtesel" from 1927 - when the Zweirad Stenger company was founded - can hardly be compared with the latest generation of bicycles, but the experience that we have gained with two-wheelers for over 90 years is useful to our customers and customers benefit.';

/** Cards on the cases page. `category` is one of CASE_CATEGORIES ids. */
export const CASE_STUDIES = [
    {id: 'elektra-2024', title: 'ELEKTRA', year: 2024, category: 'other', image: ElektraRound, text: ELEKTRA_TEXT},
    // TODO(content): Baillat still uses the Elektra description
    {id: 'baillat-2023', title: 'BALLIAT', year: 2023, category: 'design', image: BaillatRound, text: ELEKTRA_TEXT},
    {id: 'stenger-2022', title: 'STENGER', year: 2022, category: 'sport', image: StengerRound, text: STENGER_TEXT},
    // TODO(content): placeholder copies of Elektra until the real cases are added
    {id: 'placeholder-1', title: 'ELEKTRA', year: 2023, category: 'other', image: ElektraRound, text: ELEKTRA_TEXT},
    {id: 'placeholder-2', title: 'ELEKTRA', year: 2023, category: 'other', image: ElektraRound, text: ELEKTRA_TEXT},
    {id: 'placeholder-3', title: 'ELEKTRA', year: 2023, category: 'other', image: ElektraRound, text: ELEKTRA_TEXT},
];
