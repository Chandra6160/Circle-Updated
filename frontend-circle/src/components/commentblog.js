import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            blog_name: "",
            comment: "",
            users: [],
            images: ["https://cdn1.iconfinder.com/data/icons/business-users/512/circle-512.png", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCCr3eSeeWvudj93uA8Ifwj9rOmdKKQlKCUY4lL30z8rJLKduR", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwSzRpxUk926BROYu3Swue33L10jNBinAUgGMLb2N7--OtjT_5", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTETuYS6R40jNdgyufueYRZd3hJZzXoNcg0ZC0ISmjlmVH2Cpwp", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdqlLjLEux-yXCW1sQZa7Z1jNQ_2LQjL_GRPieYHY7AMReTqz8", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ08T0C_UMZnivqfBHYvqQ2IVUM0usS6dF3oveu_my6eDIM-RKG", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfy5ArtpsVDzX7Ee4UCxWRCkHaMgGbX0jlYQHiP4qLlCDpimMH"]
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount() {
        axios({
            method: "get",
            url: "http://localhost:5000/blogs"
        })
            .then((res) => {
                console.log(res)
                res.data.map(e => {
                    if (e._id.$oid == this.props.match.params.blogid) {
                        this.setState({
                            blog_name: e.heading
                        })
                    }
                })
            })
            .catch(err => alert(err))
        axios({
            method: "get",
            url: `http://localhost:5000/blogs/common/${this.props.match.params.blogid}`
        })
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err => alert(err))
    }
    
    
    onComment = () => {
        let ob = {
            comment: this.state.comment
        }
        axios({
            method: "post",
            url: `http://localhost:5000/commentblogs/${this.props.match.params.id}/blog/${this.props.match.params.blogid}`,
            data: ob
        })
            .then(res => alert(res.data))
            .catch(err => alert(err))
        
    }
    render() {
        // console.log(this.state.users)
        return (
            <React.Fragment>
                <div className="container jumbotron">
                    <div className="row justify-content-center">
                        <h4>Blog Name : {this.state.blog_name}</h4>
                    </div>
                    <br />
                    <div className="row">
                        <p style={{ fontSize: "35px" }}>Arrow Functions in JavaScript</p>
                    </div>
                    <div className="row mt-3">
                        <p className="lead">Description:</p>
                    </div>
                    <div className="row mt-2 ml-2">
                        <p className="" style={{ fontSize: "20px" }}>If you’re learning JavaScript, you’ve probably encountered arrow functions, which use arrow notation (=>) to concisely define a function. They can be very handy but it is important to know when to use them, and when not to use them. Take a look at an example of an arrow function below:
                        </p>
                    </div>
                    <hr />
                    <div className="row mt-3">
                        <b> Add Comments</b>
                    </div>
                    <div className="row">
                        <form className="col-6">
                            <div class="form-group">
                                <label for="exampleInputEmail1"></label>
                                <input type="text" name="comment" onChange={this.handleChange} value={this.state.comment} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter comment here" />
                            </div>

                            <button type="button" class="btn btn-primary" onClick={this.onComment}>Add</button>
                        </form>
                    </div>
                    <h2 className="justify-content-center mt-3">First level freinds who are commented on this blog</h2>
                    {this.state.users.length == 0 ? (<p className="lead">None of them commented here</p>) : (
                        <div class="row">
                            {this.state.users.map((e, id) => {
                                return (
                                    <div className="col-lg-3 col-md-6 col-sm-12 m-3">
                                        <div className="card">
                                            <img src={this.state.images[Math.floor(Math.random() * this.state.images.length)]} class="card-img-top" alt="..." style={{ height: "200px", width: "220px" }} />
                                            <div class="card-body">
                                                <h5 class="card-title">Name: {e.name}</h5>
                                                <p className="lead">Contact No: {e.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </React.Fragment>

        )
    }
}