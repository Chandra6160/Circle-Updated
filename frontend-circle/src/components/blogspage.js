import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

export default class Blogsshow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            users: [],
            level: "",
            btn: true,
            blogs: [],
            matched: [],
            images: ["https://scatter.co.in/wp-content/uploads/2018/01/shutterstock_720876373.jpg", "https://www.visitmountdora.com/wp-content/uploads/2019/04/blog.jpeg", "https://clarkwp.files.wordpress.com/2013/12/blog-logo.jpg", "http://smarterware.org/wp-content/uploads/2016/09/blogging.jpg", "https://buzzsouthafrica.com/wp-content/uploads/blogs-2.jpg", "https://professionalwritingservices.in/wp-content/uploads/2018/06/BLOG-Writing-services1.jpg", "https://images.financialexpress.com/2017/08/Blogs.jpg"]
        }
    }
    componentDidMount() {
        axios({
            method: "get",
            url: "http://localhost:5000/blogs"
        })
            .then((res) => {
                console.log(res)
                this.setState({
                    blogs: [...res.data]
                })
            })
            .catch(err => alert(err))
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
        this.state.blogs.map(e => {
            if (e.heading == this.state.search) {
                this.state.matched.push(e)
                this.setState({
                    btn: false
                })
            }
        })
        return this.state.btn ? alert("No blogs found") : null
    }
    render() {
        // console.log(this.state.images.length)
        return (
            <React.Fragment>
                <div className="container jumbotron">
                    <div className="row justify-content-center">
                        {this.state.users.map(e => {
                            if (e._id.$oid == this.props.match.params.id) {
                                return (
                                    <h4>{e.name}</h4>
                                )
                            }

                        })}
                    </div>
                    <br />
                    <div className="row justify-content-center">
                        <form className="col-3">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Enter Level</label>
                                <input type="text" name="level" onChange={this.handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                            </div>
                            <button type="button" class="btn btn-primary" onClick={() => {
                                this.props.history.push({
                                    pathname: `/user/${this.props.match.params.id}/level/${this.state.level}`
                                })
                            }}>Show freinds</button>
                        </form>
                        <div className="col-3" style={{ width: "200px" }}></div>
                        <form className="col-3">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Search Blogs</label>
                                <input type="text" name="search" onChange={this.handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                            </div>
                            <button type="button" class="btn btn-primary" onClick={this.onSearch}>Search</button>
                        </form>
                    </div>
                    {this.state.btn ? (
                        <div>
                            <div className="row justify-content-center mt-5">
                                <h3>Available blogs</h3>
                            </div>
                            <div className="row mt-3">
                                {this.state.blogs.map((e, id) => {
                                    return (
                                        <div className="col-lg-3 col-md-6 col-sm-12 m-3">
                                            <div className="card">
                                                <img src={this.state.images[Math.floor(Math.random() * this.state.images.length)]} class="card-img-top" alt="..." style={{ height: "200px", width: "220px" }} />
                                                <div class="card-body">
                                                    <h5 class="card-title">Heading: {e.heading}</h5>
                                                    <p className="lead">Text: {e.text}</p>
                                                    <button className="btn btn-primary" onClick={() => {
                                                        this.props.history.push({
                                                            pathname: `/user/${this.props.match.params.id}/blog/${e._id.$oid}`
                                                        })
                                                    }}>view  <i class="fas fa-eye"></i></button>
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
                                    <h3>Searched blogs</h3>
                                </div>
                                <div className="row mt-3">
                                    {this.state.matched.map((e, id) => {
                                        return (
                                            <div className="col-lg-3 col-md-6 col-sm-12 m-3">
                                                <div className="card">
                                                    <img src={this.state.images[Math.floor(Math.random() * this.state.images.length)]} class="card-img-top" alt="..." style={{ height: "200px" }} />
                                                    <div class="card-body">
                                                        <h5 class="card-title">Heading: {e.heading}</h5>
                                                        <p className="lead">Text: {e.text}</p>
                                                        <button className="btn btn-primary" onClick={() => {
                                                            this.props.history.push({
                                                                pathname: `/user/${this.props.match.params.id}/blog/${e._id.$oid}`
                                                            })
                                                        }}>view  <i class="fas fa-eye"></i></button>
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



