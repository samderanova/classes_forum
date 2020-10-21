import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../styles/footer.scss';

export default function Footer () {
    return (
        <div className="footer" style={{height: '100vh'}}>
            <p>Built for WebJam 2020</p>
        </div>
    )
}