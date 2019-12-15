import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
export default class Blogs extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            heading:"",
            text:""
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onAdd=()=>{
        let ob={
            "heading":this.state.heading,
            "text":this.state.text
        }
        axios({
            method:"post",
            url:"http://localhost:5000/createblogs",
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
                        <h3>Add Blog Details</h3>
                        <form className="col-6">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Heading</label>
                                <input type="text" name="heading" onChange={this.handleChange} value={this.state.heading} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter heading name" />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Text</label>
                                <input type="text" name="text" onChange={this.handleChange} value={this.state.text} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter text" />
                            </div>
                            <button type="button" class="btn btn-primary" onClick={this.onAdd}>Add</button>
                        </form>
                </div>
            </React.Fragment>
        );
    }
}
