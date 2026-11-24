import {Link} from "react-router-dom";

export default function NotFoundPage(){
    return(
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--content-dark)',
            color: 'var(--content-light)'
        }}>
            <h1 className='change-font' style={{paddingTop: 60}}>Page not found</h1>
            <Link to='/' className='primary-link'>Back to home</Link>
        </div>
    )
}
