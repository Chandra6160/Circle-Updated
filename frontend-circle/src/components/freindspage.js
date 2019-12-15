import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
export default class Freinds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            freinds: [],
            images: ["https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCCr3eSeeWvudj93uA8Ifwj9rOmdKKQlKCUY4lL30z8rJLKduR", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwSzRpxUk926BROYu3Swue33L10jNBinAUgGMLb2N7--OtjT_5", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTETuYS6R40jNdgyufueYRZd3hJZzXoNcg0ZC0ISmjlmVH2Cpwp", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdqlLjLEux-yXCW1sQZa7Z1jNQ_2LQjL_GRPieYHY7AMReTqz8", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ08T0C_UMZnivqfBHYvqQ2IVUM0usS6dF3oveu_my6eDIM-RKG", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfy5ArtpsVDzX7Ee4UCxWRCkHaMgGbX0jlYQHiP4qLlCDpimMH"]
        }
    }
    componentDidMount() {
        console.log(this.props.history.location.pathname)
        axios({
            method: "get",
            url: `http://localhost:5000${this.props.history.location.pathname}`
        })
            .then((res) => {
                console.log(res)
                this.setState({
                    freinds: res.data
                })
                axios({
                    method: "get",
                    url: `http://localhost:5000/users`
                })
                    .then((response) => {
                        response.data.map(e => {
                            if (e._id.$oid == this.props.match.params.id) {
                                this.setState({
                                    user: e.name
                                })
                            }
                        })
                    })


            })
            .catch((err) => {
                axios({
                    method: "get",
                    url: `http://localhost:5000/users`
                })
                    .then((response) => {
                        response.data.map(e => {
                            if (e._id.$oid == this.props.match.params.id) {
                                this.setState({
                                    user: e.name
                                })
                            }
                        })
                    })
            })
    }
    render() {
        console.log(this.state.freinds)
        return (
            <React.Fragment>
                <div className="container jumbotron">
                    <p className="lead py-5" style={{ fontSize: "35px", fontWeight: "400" }}>{this.state.user}'s {this.props.match.params.levelno} level freinds</p>
                    {this.state.freinds.length == 0 ? (<p className="lead">For this user none of the freinds available at this level</p>) : (
                        <div class="row">
                            {this.state.freinds.map((e, id) => {
                                if (e._id.$oid !== this.props.match.params.id) {
                                    return (
                                        <div className="col-lg-3 col-md-6 col-sm-12 m-3">
                                            <div className="card" >
                                                <Link to={`/user/${e._id.$oid}`}><img src={this.state.images[Math.floor(Math.random() * this.state.images.length)]} class="card-img-top" alt="..." style={{ height: "200px", width: "220px" }} /></Link>
                                                <div class="card-body">
                                                    <h5 class="card-title">Name: {e.name}</h5>
                                                    <p className="lead">Contact No: {e.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            })}
                        </div>
                    )}
                </div>

            </React.Fragment>

        );
    }
}