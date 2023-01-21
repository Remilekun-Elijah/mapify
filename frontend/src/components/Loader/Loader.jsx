import React from 'react';
import './Loader.css';

const Loader = ({className}) => {
    return (
        <div className={`sk-fading-circle`}>
            <div className={`sk-circle1 sk-circle ${className}`}></div>
            <div className={`sk-circle2 sk-circle ${className}`}></div>
            <div className={`sk-circle3 sk-circle ${className}`}></div>
            <div className={`sk-circle4 sk-circle ${className}`}></div>
            <div className={`sk-circle5 sk-circle ${className}`}></div>
            <div className={`sk-circle6 sk-circle ${className}`}></div>
            <div className={`sk-circle7 sk-circle ${className}`}></div>
            <div className={`sk-circle8 sk-circle ${className}`}></div>
            <div className={`sk-circle9 sk-circle ${className}`}></div>
            <div className={`sk-circle10 sk-circle ${className}`}></div>
            <div className={`sk-circle11 sk-circle ${className}`}></div>
            <div className={`sk-circle12 sk-circle ${className}`}></div>
        </div>
    )
}

export default Loader;