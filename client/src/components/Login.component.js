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
        var inputs = Array.from(e.target.children).filter(child => child.outerHTML !== '<br>').filter(child => child.localName !== 'label').map(input => input.value);
        let email = inputs[0], password = inputs[1]
        axios.get(`${url}/api`)
            .then(res => {
                var infos = {}
                for (var u of res.data) {
                    infos[u.email] = u._id
                }
                console.log(infos)
                if (email in infos) {
                    console.log(true)
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
            <div className="Login">
                <form onSubmit={this.login}>
                    <label>Email:</label><br></br>
                    <input id="email" type="text" name="email" /><br></br>
                    <label>Password:</label><br></br>
                    <input id="password" type="password" name="password" /><br></br>
                    <div className="submit">
                        <p>Forgot Password?</p>
                        <Button variant="contained" type="submit" style={{color: 'white'}}>Submit</Button>
                    </div>
                    
                </form>
                <p><Link to='/register'>Create an account</Link></p>
                <p id="incorrectPassword" style={{color: 'red'}}></p>
            </div>
        )
    }
}