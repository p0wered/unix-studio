import {Link} from 'react-router';
import {UnderConstruction} from '../components/ui/UnderConstruction';

export default function NotFoundPage() {
    return (
        <UnderConstruction title='Page not found'>
            <Link to='/' className='primary-link'>
                Back to home
            </Link>
        </UnderConstruction>
    );
}
