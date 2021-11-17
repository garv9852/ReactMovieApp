import {movies} from './getmovies'
import React, { Component } from 'react'
import "./banner.css"

export default class banner extends Component {
    render() {
        let movie=movies.results[0];
        return (
            <>{
                movie===''?
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>:
                <div className="banner-container">
                <div className="card banner-card">
                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-img" alt="..."/>
                    <div className="card-body banner-text">
                        <h5 className="card-title">{movie.original_title}</h5>
                        <p className="card-text">{movie.overview}</p>
                    </div>
                </div>
                </div>
            }</>
        )
    }
}
