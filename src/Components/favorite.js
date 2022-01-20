import React, { Component } from 'react'
import {movies} from "./getmovies"

export default class favorite extends Component {
    constructor(){
        super()
        this.state={
            genre:[],
            movies:[],
            AllMovie:[],
            currGen:"All Genres"
        }
    }
    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let movieData=JSON.parse(localStorage.getItem("movies-app"));
        let temp=[]
        movieData.forEach(function(m){
            m["genre"]=genreids[m.genre_ids[0]]
            if(!temp.includes(genreids[m.genre_ids[0]]))
            {
                temp.push(genreids[m.genre_ids[0]]);
            }
        })
        temp.unshift("All Genres")
        this.setState({
            genre:[...temp],
            movies:[...movieData],
            AllMovie:[...movieData]
        })
    }
    changeGenreHandler=()=>{
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let temp=[]
        this.state.AllMovie.forEach(function(m){
            m["genre"]=genreids[m.genre_ids[0]]
            if(!temp.includes(genreids[m.genre_ids[0]]))
            {
                temp.push(genreids[m.genre_ids[0]]);
            }
        })
        temp.unshift("All Genres")
        let changeIndex=this.state.genre[this.state.genre.indexOf(this.state.currGen)-1];
        this.setState({
            genre:[...temp],
        })
        return changeIndex;
    }
    changeMovieHandler=(prevIndex)=>{
        let currGen=this.state.currGen;
        if(currGen=="All Genres")
        {
            this.setState({
                movies:this.state.AllMovie
            })
        }
        else{
            let movieData=this.state.AllMovie.filter(function(m){
                return currGen==m.genre
            })
            if(movieData==0)
            {
                if(prevIndex!="All Genres")
                {
                    movieData=this.state.AllMovie.filter(function(m){
                        return prevIndex==m.genre
                    })
                }
                else{
                    movieData=this.state.AllMovie;
                }
                this.setState({
                    currGen:prevIndex
                })
            }
            this.setState({
                movies:movieData
            })
        }
    }
     deleteFunc=async (movieObj)=>{
        let movieData=[];
        movieData=this.state.AllMovie.filter(function(m){
            return movieObj.id!=m.id
        })
        // console.log(movieData);
        await this.setState({
            AllMovie:movieData
        })
        localStorage.setItem("movies-app",JSON.stringify(movieData));
        let prevIndex=this.changeGenreHandler();
        this.changeMovieHandler(prevIndex);
    }
    changeGenre=async (gen)=>{
        await this.setState({
            currGen:gen
        })
        this.changeMovieHandler();
    }
    render() {
        // console.log(this.state.genre)
        // console.log(this.state.movies)
        return (
            <>
                <div className="main">
                    <div className="row">
                        <div className="col-3">
                            <ul class="list-group favorite-genres">
                                {
                                    this.state.genre.map((gen)=>(
                                        <li class={`list-group-item ${gen==this.state.currGen?"active":""}`} onClick={()=>this.changeGenre(gen)}>{gen}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-9 favorite-tables">
                            <div className="row">
                                <input type="text" className="input-group-text col" placeholder="Search"></input>
                                <input type="number" className="input-group-text col" placeholder='Rows Count'></input>
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
                                        this.state.movies.map((movieObj)=>(
                                        <tr>
                                            <th><img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} style={{'width':'5rem'}}/>{movieObj.original_title}</th>
                                            <td>{movieObj.genre}</td>
                                            <td>{movieObj.popularity}</td>
                                            <td className="">{movieObj.vote_average}</td>
                                            <td><button className="btn btn-danger" onClick={()=>this.deleteFunc(movieObj)}>Delete</button></td>
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
