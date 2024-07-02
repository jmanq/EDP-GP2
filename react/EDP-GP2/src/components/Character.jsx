import React from 'react';

const Character = (props) => {
    return (
        <div style={{ padding: '10px', margin: '10px', border: '1px solid var(--dark2)', borderRadius: '5px', color:'var(--dark2)', backgroundColor: 'var(--light2)', fontWeight: 'bold' }}>
            <div className="card-body">
                <div className="card-text">{props.data.name}</div>
            </div>
        </div>
    );
};

export default Character;