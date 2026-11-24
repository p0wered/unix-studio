import {useCallback} from 'react';
import {Link} from 'react-router';
import useEmblaCarousel from 'embla-carousel-react';

const OPTIONS = {loop: true, align: 'start'};

/**
 * Looping, draggable row of case cards (replaces react-slick). Clicking a card that isn't
 * the first one scrolls it into place, like slick's `focusOnSelect`.
 *
 * items: [{title, image, subtitle?, to?}]
 */
export function Carousel({items}) {
    const [viewportRef, embla] = useEmblaCarousel(OPTIONS);

    // Embla swallows the click that ends a drag, so this only fires on real clicks
    const select = useCallback((index) => embla?.scrollTo(index), [embla]);

    return (
        <div className='carousel home-slider'>
            <div className='carousel__viewport' ref={viewportRef}>
                <div className='carousel__container'>
                    {items.map((item, i) => (
                        <div className='carousel__slide' key={`${item.title}-${i}`} onClick={() => select(i)}>
                            <div className='h-item'>
                                <img src={item.image} alt={item.title} loading='lazy' decoding='async' draggable={false}/>
                                <div className='merger'>
                                    {item.to
                                        ? <Link to={item.to} className='primary-link' style={{fontSize: 24}}>{item.title}</Link>
                                        : <p className='primary-link' style={{fontSize: 24}}>{item.title}</p>}
                                    {item.subtitle && <p className='change-font'>{item.subtitle}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
