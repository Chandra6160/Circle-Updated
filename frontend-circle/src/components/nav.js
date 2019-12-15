import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }
    componentDidMount() {
        axios({
            method: "get",
            url: "http://localhost:5000/signin",
        })
            .then((res) => {
                if (res.data) {
                    res.data.map(e => {
                        if (e.email == this.props.match.params.email) {
                            this.setState({
                                username: e.name
                            })
                        }
                    })
                }
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid bg-light">
                    <div className="container">

                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <Link to="/" class="navbar-brand" >Blogspress</Link>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>

                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav ml-auto">
                                    <li class="nav-item active">
                                        <Link to="/show" class="nav-link" >Show Users <span class="sr-only">(current)</span></Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="/addusers" class="nav-link" >Add users</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link to="/addblogs" class="nav-link" >Add blogs</Link>
                                    </li>
                                </ul>

                            </div>
                        </nav>
                    </div>
                </div>


            </React.Fragment>
        );
    }
}

export default Nav;