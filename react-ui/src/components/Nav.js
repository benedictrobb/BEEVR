import React, {Component} from 'react';
import {Link} from 'react-router';
import {logout} from '../actions/logout.js';
import BurgerMenu from './Menu.js';
import Menu from 'react-burger-menu/lib/menus/slide';

class Nav extends Component {
    //constructor() {
        //super();
        //this.state = {
            //menu: {
                //isOpen: false,
            //}
        //};
    
        //this.toggleMenu = this.toggleMenu.bind(this);
    //}

    //toggleMenu() {
        //var menu = this.state.menu.isOpen;
        //if (!menu) {
            //this.setState({menu:true});
        //} 
        //this.setState({menu:false});
    //}

    render() {
        console.log(this.props);
        console.log(this.state);
        var isMenuOpen = function(state) {
            return state.isOpen;
        };

        return (
            <div>
                <nav
                    className="navbar sticky-top"
                    role="navigation"
                    id="burger-menu"
                >
                    <div className="container-fluid">
                        <div className="row justify-content-between align-items-center">
                            <div className="navbar-header">
                                {!this.props.role
                                    ? <Link to="/">
                                        <div className="navbar-brand">
                                            <img src="./lemmling-Cartoon-beaver.svg" />
                                            <h1>BEEVR</h1>
                                        </div>
                                    </Link>
                                    : this.props.role === 'Student'
                                        ? <Link to="/browsejobs">
                                            <div className="navbar-brand">
                                                <img src="./lemmling-Cartoon-beaver.svg" />
                                                <h1>BEEVR</h1>
                                            </div>
                                        </Link>
                                        : <Link to="/browsestudents">
                                            <div className="navbar-brand">
                                                <img src="./lemmling-Cartoon-beaver.svg" />
                                                <h1>BEEVR</h1>
                                            </div>
                                        </Link>}
                            </div>
                            <div>
                                <BurgerMenu right
                                    loggedIn={this.props.loggedIn}
                                    logout={this.props.logout}
                                />
                            </div>
                        </div>
                    </div>
                </nav>
                <nav
                    className="navbar sticky-top"
                    role="navigation"
                    id="desktop-menu"
                >
                    <div className="container-fluid container-desktop">
                        <div className="row justify-content-between align-items-baseline">
                            <div className="navbar-header">
                                {!this.props.role
                                    ? <Link to="/">
                                        <div className="navbar-brand">
                                            <img src="./lemmling-Cartoon-beaver.svg" />
                                            <h1>BEEVR</h1>
                                        </div>
                                    </Link>
                                    : this.props.role === 'Student'
                                        ? <Link to="/browsejobs">
                                            <div className="navbar-brand">
                                                <img src="./lemmling-Cartoon-beaver.svg" />
                                                <h1>BEEVR</h1>
                                            </div>
                                        </Link>
                                        : <Link to="/browsestudents">
                                            <div className="navbar-brand">
                                                <img src="./lemmling-Cartoon-beaver.svg" />
                                                <h1>BEEVR</h1>
                                            </div>
                                        </Link>}
                            </div>
                            <div>
                                <ul className="nav navbar-right">
                                    <li>
                                        {this.props.loggedIn
                                            ? <div />
                                            : <Link to="/login">Login</Link>}
                                    </li>
                                    <li>
                                        {!this.props.loggedIn
                                            ? <div />
                                            : <Link
                                                to="/"
                                                onClick={this.props.logout}
                                            >
                                                  Logout
                                            </Link>}
                                    </li>
                                    <li>
                                        {!this.props.role
                                            ? <Link to="/">Home</Link>
                                            : this.props.role === 'Student'
                                                ? <Link to="/browsejobs">
                                                    Home
                                                </Link>
                                                : <Link to="/browsestudents">
                                                    Home
                                                </Link>}
                                    </li>
                                    <li>
                                        {this.props.loggedIn
                                            ? <div />
                                            : <Link to="/registerstudent">
                                                  Register As Student
                                            </Link>}
                                    </li>

                                    <li>
                                        {this.props.loggedIn
                                            ? <div />
                                            : <Link to="/registerresident">
                                                  Register As Resident
                                            </Link>}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Nav;
