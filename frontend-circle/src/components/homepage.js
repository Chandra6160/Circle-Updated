import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
export default class Home extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid" style={{background:"#0073aa",height:"90vh"}}>
                    <div class="row justify-content-center" style={{padding:"30vh 300px"}} >
                        <p style={{color:"white",fontSize:"70px",fontWeight:"400",textAlign:"center"}}>Meet Blogspress</p>
                        <p style={{color:"white",fontWeight:"lighter",fontSize:"20px",textAlign:"center"}}>Blogspress is open source software you can use to create a beautiful website, blog, or app.</p>
                            <button className="btn btn-outline-light" onClick={()=>{
                                this.props.history.push({
                                    pathname:"/show"
                                })
                            }}>Get BlogsPress</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}