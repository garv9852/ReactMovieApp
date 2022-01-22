import React, { Component } from 'react'
import {movies} from "./getmovies"

export default class favorite extends Component {
    constructor(){
        super()
        this.state={
            genre:[],
            movies:[],
            AllMovie:[],
            currGen:"All Genres",
            currText:"",
            limit:5,
            currPage:1
        }
    }
    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let movieData=JSON.parse(localStorage.getItem("movies-app")) || [];
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
        let AllMovie=this.state.AllMovie
        if(currGen=="All Genres")
        {
            this.setState({
                movies:AllMovie
            })
        }
        else{
            let movieData=AllMovie.filter(function(m){
                return currGen==m.genre
            })
            if(movieData==0)
            {
                if(prevIndex!="All Genres")
                {
                    movieData=AllMovie.filter(function(m){
                        return prevIndex==m.genre
                    })
                }
                else{
                    movieData=AllMovie;
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
            currPage:1,
            currGen:gen
        })
        this.changeMovieHandler();
    }
    inDecPop=(level)=>{
        let allMovie=this.state.movies;
        allMovie.sort(function(obja,objb){
            return objb.popularity-obja.popularity
        })
        if(level=="de")
        {
            allMovie.reverse();
        }
        this.setState({
            movies:[...allMovie]
        })
    }
    inDecRat=(level)=>{
        let allMovie=this.state.movies;
        allMovie.sort(function(obja,objb){
            return objb.vote_average-obja.vote_average
        })
        if(level=="de")
        {
            allMovie.reverse();
        }
        this.setState({
            movies:[...allMovie]
        })
    }
    changePage=(m)=>{
        this.setState({
            currPage:m
        })
    }
    render() {
        let AllMovie=this.state.movies
        if(this.state.currText!="")
        {
            AllMovie=AllMovie.filter((m)=>{
                let movieObj='';
                if(m.original_title!=undefined)
                {
                    movieObj=m.original_title.toLowerCase()
                }
                return movieObj.includes(this.state.currText.toLowerCase())
            })
        }
        let pagesArr=[];
        for(let i=1;i<=Math.ceil(AllMovie.length/this.state.limit);i++)
        {
            pagesArr.push(i);
        }
        let startPage=(this.state.currPage-1)*this.state.limit;
        let endPage=this.state.currPage*this.state.limit;
        AllMovie=AllMovie.slice(startPage,endPage);
        //console.log(pagesArr);
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
                                <input type="text" className="input-group-text col" placeholder="Search" value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}></input>
                                <input type="number" className="input-group-text col" placeholder='Rows Count' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}></input>
                            </div>
                            <div className="row">
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col"><div className='material-icons' onClick={()=>this.inDecPop("in")}>expand_less</div>Popularity<div className='material-icons' onClick={()=>this.inDecPop("de")}>expand_more</div></th>    
                                    <th scope="col"><div className='material-icons' onClick={()=>this.inDecRat("in")}>expand_less</div>Rating<div className='material-icons' onClick={()=>this.inDecRat("de")}>expand_more</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        AllMovie.map((movieObj)=>(
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
                                    {
                                        pagesArr.map((m)=>(
                                            <li class="page-item"><a class="page-link" href="#" onClick={()=>this.changePage(m)}>{m}</a></li> 
                                        ))
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
