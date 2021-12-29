import React from 'react';
import notFoundGif from '../style/lost-john-travolta.gif';
const NotFound = () => {
    return (
        <div
            style={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <img src={notFoundGif} alt="Loading..." />
            <p style={{ fontSize: '50px' }}>404 PAGE NOT FOUND</p>
            <p style={{ fontSize: '20px' }}>{window.location.pathname} is not a valid route</p>
        </div>
    );
};

export default NotFound;
