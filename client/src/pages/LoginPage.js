import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './login_style.css';

var passwordHash = require('password-hash');

export default class Login extends Component {
	
	login_empty_user_name = false;
	login_incorrect_password = false;
	login_no_user_by_user_name = false;
	signup_empty_user_name = false;
	signup_password_missmatch = false;
	signup_bad_user_name = false;
	signup_user_already_exits = false;
	
	constructor(props) {
        super(props);

        this.state = {
            login_user_name: '',
            login_password: '',
            login_logged_in: false,
			signup_user_name: '',
			signup_password1: '',
			signup_password2: '',
			login_warning: '',
			signup_warning: ''
        }
		
		this.onChangeLoginUserName = this.onChangeLoginUserName.bind(this);
        this.onChangeLoginPassword = this.onChangeLoginPassword.bind(this);
		this.onChangeLoginLoggedIn = this.onChangeLoginLoggedIn.bind(this);
		this.onChangeSignupUserName = this.onChangeSignupUserName.bind(this);
		this.onChangeSignupPassword1 = this.onChangeSignupPassword1.bind(this);
		this.onChangeSignupPassword2 = this.onChangeSignupPassword2.bind(this);
		
        this.onLoginButton = this.onLoginButton.bind(this);
		this.onSignupButton = this.onSignupButton.bind(this);
		this.onLogoutButton = this.onLogoutButton.bind(this);
		this.render = this.render.bind(this);
		
		if (localStorage.getItem("user") != "null") {
			this.state.login_logged_in = true;
		}
    }
	
	onChangeLoginUserName(e) {
        this.setState({
            login_user_name: e.target.value
        });
    }

    onChangeLoginPassword(e) {
        this.setState({
            login_password: e.target.value
        });
    }
	
	onChangeLoginLoggedIn(e) {
        this.setState({
            login_logged_in: e.target.value
        });
	}
	
	onChangeSignupUserName(e) {
		this.setState({
			signup_user_name: e.target.value
		});
	}
	
	onChangeSignupPassword1(e) {
		this.setState({
			signup_password1: e.target.value
		});
	}
	
	onChangeSignupPassword2(e) {
		this.setState({
			signup_password2: e.target.value
		});
	}
	
	onLoginButton(e) {
		e.preventDefault();

		console.log('login clicked');
		console.log('login username: ' + this.state.login_user_name);
		console.log('login password: ' + this.state.login_password);
		
		axios.get('http://localhost:3001/api/users/' + this.state.login_user_name)
		.then(response => {
			if (response.data.length === 0) {
				console.log('no username ' + this.state.login_user_name);
				// display warning
				this.login_no_user_by_user_name = true;
				this.setState({
					login_warning: "No user by username"
				});
				return;
			} else {
				var password = response.data[0].password;
				if (passwordHash.verify(this.state.login_password, password)) {
					this.setState({
						login_logged_in: true
					});
					
					localStorage.setItem("user", this.state.login_user_name);
				} else {
					console.log('incorrect password');
					this.login_incorrect_password = true;
					this.setState({
						login_warning: "Incorrect password"
					});
				}
			}
		})
		.catch(error => {
			console.log(error);
			this.setState({
				login_warning: "Cannot connect to server"
			});
		});
    }
	
	onSignupButton(e) {
		e.preventDefault();
		
		if (!(this.state.signup_password1 === this.state.signup_password2)) {
			console.log('signup password mismatch');
			this.signup_password_missmatch = true;
			this.setState({
				signup_warning: "Password mismatch"
			});
			return;
		} else if (this.state.signup_user_name === '') {
			console.log('empty signup username');
			this.signup_empty_user_name = true;
			this.setState({
				signup_warning: "Empty username"
			});
			return;
		} else {
			var ret = false;
			axios.get('http://localhost:3001/api/users/' + this.state.signup_user_name)
			.then(response => {
				if (response.data.length >= 1) {
					console.log('username ' +this.state.signup_user_name+ ' is taken');
					// display warning
					this.signup_user_already_exits = true;
					this.setState({
						signup_warning: "User already exists"
					});
				} else {
					var pwrd = passwordHash.generate(this.state.signup_password1);
					const newUser = {
						username: this.state.signup_user_name,
						password: passwordHash.generate(this.state.signup_password1)
					};
					console.log(passwordHash.verify(this.state.signup_password1, pwrd));
					
					// the server needs to be setup so it adds this to the MongoDB, and this needs to be the correct url
					axios.post('http://localhost:3001/api/users/add', newUser)
					.then(res => {
						console.log(res.data)
						localStorage.setItem("user", this.state.signup_user_name);
					})
					.catch(error => {
						console.log(error);
						this.setState({
							signup_warning: "Cannot connect to server"
						});
					});
					
					this.setState({
						login_logged_in: true
					});
				}
			})
			.catch( error => {
				console.log(error);
				this.setState({
					signup_warning: "Cannot connect to server"
				});
			});
		}
	}
	
	onLogoutButton(e) {
		e.preventDefault();
		this.setState({
			login_logged_in: false
		});
		localStorage.setItem("user", null);
	}
	
    render() {
		
		if (this.state.login_logged_in === true) {
			//display already logged in
			return (
				<div style={{marginTop: 10, textAlign: 'center'}}>
					<h3>Logged In</h3>
					<form onSubmit={this.onLogoutButton}>
						<div className="form-group">
							<input type="submit" value="Logout" className="btn btn-primary" />
						</div>
					</form>
				</div>
			)
		} else {
			
			return (
				<div style={{marginTop: 10, textAlign: 'center'}}>
					<div className="login_card_div">
						<div className="card login_card">
							<h3>Login</h3>
							<form onSubmit={this.onLoginButton}>
								<div className="form-group"> 
									<label>Username</label>
									<input  type="text"
											className="form-control"
											value={this.state.login_user_name}
											onChange={this.onChangeLoginUserName}
											/>
								</div>
								<div className="form-group">
									<label>Password</label>
									<input 
											type="password" 
											className="form-control"
											value={this.state.login_password}
											onChange={this.onChangeLoginPassword}
											/>
								</div>
								<div className="alert-danger">
									<h5>{this.state.login_warning}</h5>
								</div>
								<div className="form-group">
									<input type="submit" value="Login" className="btn btn-primary" />
								</div>
							</form>
						</div>
					</div>
					<div className="login_card_div">
						<div className="card login_card">
							<h3>Sign up</h3>
							<form onSubmit={this.onSignupButton}>
								<div className="form-group"> 
									<label>Username</label>
									<input  type="text"
											className="form-control"
											value={this.state.signup_user_name}
											onChange={this.onChangeSignupUserName}
											/>
								</div>
								<div className="form-group">
									<label>Password</label>
									<input 
											type="password" 
											className="form-control"
											value={this.state.signup_password1}
											onChange={this.onChangeSignupPassword1}
											/>
									<label>Repeat Password</label>
									<input 
											type="password" 
											className="form-control"
											value={this.state.signup_password2}
											onChange={this.onChangeSignupPassword2}
											/>
								</div>
								<div className="alert-danger">
									<h5>{this.state.signup_warning}</h5>
								</div>
								<div className="form-group">
									<input type="submit" value="Sign up" className="btn btn-primary" />
								</div>
							</form>
						</div>
					</div>
				</div>
			)
		}
    }
}