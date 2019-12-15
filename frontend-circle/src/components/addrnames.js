import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
export default class Usernames extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name:"",
            phone:""
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onAdd=()=>{
        let ob={
            "name":this.state.name,
            "phone":this.state.phone
        }
        axios({
            method:"post",
            url:"http://localhost:5000/createusers",
            data:ob
        })
        .then((res)=>{
            alert(res.data)
        })
        .catch(err=>alert(err))
    }
    render() {
        return (
            <React.Fragment>
                <div className="jumbotron container">
                        <h3>Add User Details</h3>
                        <form className="col-6">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input type="text" name="name" onChange={this.handleChange} value={this.state.name} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Contact number</label>
                                <input type="text" name="phone" onChange={this.handleChange} value={this.state.phone} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter mobile no" />
                            </div>
                            <button type="button" class="btn btn-primary" onClick={this.onAdd}>Add</button>
                        </form>
                </div>
            </React.Fragment>
        );
    }
}
