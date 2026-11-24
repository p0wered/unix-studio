/** Placeholder for pages that aren't designed yet. */
export function UnderConstruction({title = 'Under construction', children}) {
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--content-dark)',
            color: 'var(--content-light)',
        }}>
            <h1 className='change-font' style={{paddingTop: 60}}>{title}</h1>
            {children}
        </div>
    );
}
