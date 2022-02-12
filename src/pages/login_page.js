import React, { Component } from 'react';

//main welcome page with login and link to signing in
class Login extends Component
{
    constructor()
    {
        super();
        this.state={
            email: '',
            password: ''
        };
    }

    handleSubmit = (event) =>
    {
        event.preventDefault();
        const user = {
            email: this.state.email,
            //username: this.state.name,
            password: this.state.pwd
        };
        //this.props.loginUser(userData, this.props.history);

    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render()
    {
        return(
            <div>
                <div>
                    {/*todo: put some logo here*/}
                </div>
                <div>
                    <form onSubmit = {this.handelSubmit}>
                        {/*todo: find a way so that name/amil can be but either way*/}
                        <input type = 'email' placeholder = 'email' required onChange={this.handleChange}/>
                        <input type = 'password' name = 'password' placeholder = 'password' required onChange={this.handelChange}/>
                        <button onSubmit = {this.handelSubmit}>Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;