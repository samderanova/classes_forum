import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Button} from '@material-ui/core'
import {url} from '../index'
import '../styles/login.scss'
const bcrypt = require('bcryptjs');

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
    }
    login(e) {
        e.preventDefault();
        var input = Array.from(document.getElementsByClassName('log-input')).map(el => el.value)
        let email = input[0], password = input[1]
        axios.get(`${url}/api`)
            .then(res => {
                var infos = {}
                for (var u of res.data) {
                    infos[u.email] = u._id
                }
                if (email in infos) {
                    axios.get(`${url}/api/getprofile/${infos[email]}`)
                        .then(res => {
                            if (bcrypt.compareSync(password, res.data.password)) {
                                // log them in; route user to the profile component
                                localStorage.setItem(email, true)
                                window.location.href = '/profile'
                            }
                            else {
                                document.getElementById('email').style.borderColor = 'red';
                                document.getElementById('password').style.borderColor = 'red';
                                document.getElementById('incorrectPassword').innerHTML = 'Please enter a valid email and/or password!'
                            }
                        })
                        .catch(err => console.log(`Error: ${err}`))
                }
                else {
                    console.log('email')
                    document.getElementById('email').style.borderColor = 'red';
                    document.getElementById('password').style.borderColor = 'red';
                    document.getElementById('incorrectPassword').innerHTML = 'Please enter a valid email and/or password!'
                }
            })
            .catch(err => console.log(err));
    }
    render() {
        if (localStorage.length > 0) window.location.href = '/profile';
        return (
            <div>
                <div className="Login">
                    <form onSubmit={this.login}>
                        <h3>Login</h3>
                        <input className="log-input" id="email" type="text" name="email" placeholder="Email" /><br></br>
                        <input className="log-input" id="password" type="password" name="password" placeholder="Passwprd" /><br></br>
                        <div className="submit">
                            <p>Forgot Password?</p>
                            <Button variant="contained" type="submit" style={{color: 'white'}}>Submit</Button>
                        </div>
                        
                    </form>
                    <p><Link to='/register'>Create an account</Link></p>
                    <div id="incorrectPassword" style={{color: 'red'}}></div>
                </div>
                <br></br>
            </div>
        )
    }
}