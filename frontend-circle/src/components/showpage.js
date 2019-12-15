import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

export default class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            btn: true,
            users: [],
            matched: [],
            images: ["https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCCr3eSeeWvudj93uA8Ifwj9rOmdKKQlKCUY4lL30z8rJLKduR", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwSzRpxUk926BROYu3Swue33L10jNBinAUgGMLb2N7--OtjT_5", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTETuYS6R40jNdgyufueYRZd3hJZzXoNcg0ZC0ISmjlmVH2Cpwp", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdqlLjLEux-yXCW1sQZa7Z1jNQ_2LQjL_GRPieYHY7AMReTqz8", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ08T0C_UMZnivqfBHYvqQ2IVUM0usS6dF3oveu_my6eDIM-RKG", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfy5ArtpsVDzX7Ee4UCxWRCkHaMgGbX0jlYQHiP4qLlCDpimMH"]
        }
    }
    componentDidMount() {
        axios({
            method: "get",
            url: "http://localhost:5000/users"
        })
            .then((res) => {
                console.log(res)
                this.setState({
                    users: [...res.data]
                })
            })
            .catch(err => alert(err))
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSearch = () => {
        this.state.users.map(e => {
            if (e.name == this.state.search) {
                this.state.matched.push(e)
                this.setState({
                    btn: false
                })
            }
        })
        return this.state.btn ? alert("No users found") : null
    }
    render() {
        console.log(this.state.images.length)
        return (
            <React.Fragment>
                <div className="container jumbotron">
                    <div className="row justify-content-center">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Search Users</label>
                                <input type="text" name="search" onChange={this.handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                            </div>
                            <button type="button" class="btn btn-primary" onClick={this.onSearch}>Search</button>
                        </form>
                    </div>
                    {this.state.btn ? (
                        <div>
                            <div className="row justify-content-center mt-5">
                                <h3>Available Users</h3>
                            </div>
                            <div className="row mt-3">
                                {this.state.users.map((e, id) => {
                                    return (
                                        <div className="col-lg-3 col-md-6 col-sm-12 m-3">
                                            <div className="card">
                                                <img src={this.state.images[Math.floor(Math.random() * this.state.images.length)]} class="card-img-top" alt="..." style={{height:"200px",width:"220px"}}/>
                                                <div class="card-body">
                                                    <h5 class="card-title">Name: {e.name}</h5>
                                                    <p className="lead">Contact No: {e.phone}</p>
                                                    <button className="btn btn-primary" onClick={()=>{
                                                        this.props.history.push({
                                                            pathname:`/user/${e._id.$oid}`
                                                        })
                                                    }} >Access Blogs</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : (
                            <div>
                                <div className="row justify-content-center mt-5">
                                    <h3>Searched users</h3>
                                </div>
                                <div className="row mt-3">
                                    {this.state.matched.map((e, id) => {
                                        return (
                                            <div className="col-lg-3 col-md-6 col-sm-12 m-3">
                                                <div className="card">
                                                    <img src={this.state.images[Math.floor(Math.random() * this.state.images.length)]} class="card-img-top" alt="..." style={{height:"200px"}} />
                                                    <div class="card-body">
                                                        <h5 class="card-title">Name: {e.name}</h5>
                                                        <p className="lead">Contact No: {e.phone}</p>
                                                        <button className="btn btn-primary" onClick={()=>{
                                                        this.props.history.push({
                                                            pathname:`/user/${e._id.$oid}`
                                                        })
                                                    }} >Access Blogs</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <button className="btn btn-danger mt-3 ml-2" onClick={() => { this.setState({ btn: true }) }}>Show Available users</button>
                            </div>
                        )}
                </div>
            </React.Fragment>
        );
    }
}



