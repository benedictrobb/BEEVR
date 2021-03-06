import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/login.js';
import LoadingIndicator from 'react-loading-indicator';

class LoginForm extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            loggedIn: false,
            isAuthenticated: false,
        };
    }

    onSubmit(evt) {
        evt.preventDefault();
        var state = this.props.state;
        this.setState({errorMessage: ''});
        this.props.loginRequest(this.state.email, this.state.password, () => {
            this.setState({
                errorMessage: 'Email/ Password combination is incorrect',
            });
        });
    }

    onChange(evt) {
        var email = this.state.email;
        var password = this.state.password;
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    render() {
        return (
            <div>
                {this.state.errorMessage 
                    ? <div className="alert alert-danger">
                          Email/ Password combination is incorrect
                    </div>
                    : <div />}
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="control-label" htmlFor="Email">
                            Email
                        </label>
                        <input
                            className="form-control"
                            name="email"
                            id="Email"
                            type="email"
                            value={this.state.email}
                            placeholder="email"
                            onChange={this.onChange}
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                        />
                    </div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="form-control"
                            name="password"
                            id="password"
                            type="password"
                            value={this.state.password}
                            placeholder="password"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="button">
                        {this.props.loginRequestStatus === 'pending'
                            ? <LoadingIndicator />
                            : <button className="btn btn-primary" type="submit">
                                  Login
                            </button>}
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginRequestStatus: state.auth.status,
    };
}

export default connect(mapStateToProps, actions)(LoginForm);
