import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Nav from "./nav"
import Home from "./homepage"
import Show from "./showpage"
import Usernames from "./addrnames"
import Blogs from "./addblogs";
import Blogsshow from "./blogspage";
import Comment from "./commentblog";
import Freinds from "./freindspage";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btn: false
        }
    }

    render() {
        console.log(this.state.btn)
        return (
            <React.Fragment>
                <Route path="/" component={Nav} />
                <Route exact path="/" component={Home}/>
                <Route exact path="/show" component={Show}/>
                <Route exact path="/addusers" component={Usernames}/>
                <Route exact path="/addblogs" component={Blogs}/>
                <Route exact path="/user/:id" component={Blogsshow}/>
                <Route exact path="/user/:id/blog/:blogid" component={Comment}/>
                <Route exact path="/user/:id/level/:levelno" component={Freinds}/>
            </React.Fragment>

        );
    }
}

export default App;