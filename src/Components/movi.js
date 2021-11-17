import React, { Component } from 'react'
import axios from "axios"
export default class Movi extends Component {
    constructor(){
        super();
        this.state={
            hover:"",
            parr:[1],
            currPage:1,
            movies:[],
            favorites:[]
        }
    }
    async componentDidMount(){
        const res=await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=e797eb5a262cfbf3d90c485a56f48f28&language=en-US&page=${this.state.currPage}`);
        let data=res.data;
        this.setState({
            movies:[...data.results]
        })
    }
    prePage=()=>{
        console.log("done");
        if(this.state.currPage==1)
        {
            return;
        }
        else{
            this.setState({
                currPage:this.state.currPage-1,
                parr:[...this.state.parr.slice(0,this.state.parr.length-1)]
            },this.componentDidMount)
        }
    }
    nexPage=()=>{
        let x=this.state.currPage+1;
        console.log(this.state.currPage);
        this.setState({
            currPage:x,
            parr:[...this.state.parr,this.state.currPage+1]
        },this.componentDidMount)
    }
    loadpage=({value})=>
    {
        this.setState({
            currPage:value,
            parr:[...this.state.parr.slice(0,value)]
        },this.componentDidMount)
    }
    handleFav=(movieObj)=>{
        let od=JSON.parse(localStorage.getItem('movies-app')) || [];
        if(this.state.favorites.includes(movieObj.id))
        {
            od=od.filter((m)=>{
                return m.id!=movieObj.id;
            });
        }
        else{
            od.push(movieObj);
        }
        localStorage.setItem("movies-app",JSON.stringify(od));
        this.handleFavStore()
    }
    handleFavStore=()=>{
        let od=JSON.parse(localStorage.getItem('movies-app')) || [];
        let temp=od.map((movieObj)=>{
            return movieObj.id;
        })
        this.setState({
            favorites:[...temp]
        })
    }
    render() {
        return (
            <>
                {
                    this.state.movies.length==0?
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only"></span>
                    </div>:
                    <div>
                        <h1 className="text-center"><strong>Trending</strong></h1>
                        <div className="movies-list">
                            {
                                this.state.movies.map((movieObj)=>(
                                    <div class="card-container" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:""})}>
                                        <img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} alt="..."/>
                                        <div class="car-body">
                                            <h5 class="car-title">{movieObj.original_title}</h5>
                                            <div class="btn-c">
                                            {
                                                this.state.hover==movieObj.id && 
                                                <a class="btn btn-n btn-primary" onClick={()=>this.handleFav(movieObj)}>{this.state.favorites.includes(movieObj.id)?"Delete From Favorites":"Add to Favorites"}</a> 
                                            }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
                <div className="page-cont">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            -<li class="page-item"><a class="page-link" onClick={this.prePage}>Previous</a></li>
                            {
                                this.state.parr.map((value)=>(
                                    <li class="page-item"><a class="page-link" onClick={()=>this.loadpage({value})}>{value}</a></li>
                                ))
                            }
                            <li class="page-item"><a class="page-link" onClick={this.nexPage}>Next</a></li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }
}
