import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
    return (
        <nav>
            <div className="nav-wrapper" style={{ background: "#6600ee" }}>
                <a href="/" className="brand-logo">Covid_19</a>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/history">History</Link></li>
                </ul>
            </div>
        </nav>

    )
}
export default Navbar;
