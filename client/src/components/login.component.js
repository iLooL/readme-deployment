import React, { Component } from 'react';
var passwordHash = require('password-hash');

export default class Login extends Component {
	
	constructor(props) {
        super(props);

        this.state = {
            login_user_name: '',
            login_password: '',
			login_incorect_login: false,
            login_logged_in: false
        }
		
		this.onChangeLoginUserName = this.onChangeLoginUserName.bind(this);
        this.onChangeLoginPassword = this.onChangeLoginPassword.bind(this);
        this.onChangeLoginLoggedIn = this.onChangeLoginLoggedIn.bind(this);
		this.onChangeLoginIncorectLogin = this.onChangeLoginIncorectLogin.bind(this);
        this.onLoginButton = this.onLoginButton.bind(this);
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
	
	onChangeLoginIncorectLogin(e) {
		this.setState({
			login_incorect_login: e.target.value
		});
	}
	
	onLoginButton(e) {
		e.preventDefault();

		console.log('login clicked');
		
		/*/ query the database
		//String query = "where username == " + String(this.state.login_user_name)
		
		
		//if (result[0] == this.state.login_password) {*/
		//if (passwordHash.verify(this.state.login_password, result[0]) {
		if (false) {
			
			this.setState = ({
				login_incorect_login: false,
				login_logged_in: true
			});
			
			// run the splash page
		} else {
			
			this.setState({
				login_incorect_login: true,
				login_logged_in: false
			});
			
			this.render();
		}
    }
	
	onLogoutButton(e) {
		e.preventDefault();
		
		this.setState({
			login_logged_in: false
		});
	}
	
    render() {
		
		if (this.state.login_logged_in === true) {
			//display already logged in
			return (
				<div style={{marginTop: 10}}>
					<h3>Logged In</h3>
					<form onSubmit={this.onLogoutButton}>
						<div className="form-group">
							<input type="submit" value="Logout" className="btn btn-primary" />
						</div>
					</form>
				</div>
			)
		} else if (this.state.login_incorect_login === true) {
			return (
				<div style={{marginTop: 10}}>
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
							<h5>Incorrect login details</h5>
						</div>
						<div className="form-group">
							<input type="submit" value="Login" className="btn btn-primary" />
						</div>
					</form>
				</div>
			)
		} else {
			return (
				<div style={{marginTop: 10}}>
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
						<div className="form-group">
							<input type="submit" value="Login" className="btn btn-primary" />
						</div>
					</form>
				</div>
			)
		}
    }
}