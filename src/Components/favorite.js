import React, { Component } from 'react'
import {movies} from "./getmovies"

export default class favorite extends Component {
    constructor(){
        super()
        this.state={
            genre:[],
            currGen:"All Genres"
        }
    }
    render() {
        const movie=movies.results;
        console.log(movies);
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let temp=[];
        movie.forEach((m)=>{
            if(!temp.includes(genreids[m.genre_ids[0]]))
            {
                temp.push(genreids[m.genre_ids[0]]);
            }
        })
        temp.unshift("All Genres")
        // this.setState({
        //     genre:[...temp]
        // })
        return (
            <>
                <div className="main">
                    <div className="row">
                        <div className="col-3">
                            <ul class="list-group favorite-genres">
                                {
                                    temp.map((gen)=>(
                                        <li class={`list-group-item ${gen==this.state.currGen?"active":""}`}>{gen}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-9 favorite-tables">
                            <div className="row">
                                <input type="text" className="input-group-text col" placeholder="Search"></input>
                                <input type="number" className="input-group-text col"></input>
                            </div>
                            <div className="row">
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Popularity</th>
                                    <th scope="col">Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        movie.map((movieObj)=>(
                                        <tr>
                                            <th><img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} style={{'width':'5rem'}}/>{movieObj.original_title}</th>
                                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                                            <td>{movieObj.popularity}</td>
                                            <td className="">{movieObj.vote_average}</td>
                                            <td><button className="btn btn-danger">Delete</button></td>
                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
