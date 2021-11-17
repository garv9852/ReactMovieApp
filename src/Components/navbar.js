import React, { Component } from 'react'
import "./navbar.css"
import {Link} from 'react-router-dom'

export default class navbar extends Component {
    render() {
        return (
            <div className="navbar-cont">
                <Link to="/" style={{"textDecoration":"none"}}><h1 className="logo-btn">Movies App</h1></Link>
                <Link to="/favorites" style={{"textDecoration":"none"}}><h4 className="fav-btn">Favorites</h4></Link>
            </div>
        )
    }
}
