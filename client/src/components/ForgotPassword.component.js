import React, {Component} from 'react';
import {Button} from '@material-ui/core';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.sendEmail = this.sendEmail.bind(this)
    }
    sendEmail() {

    }
    render() {
        return (
            <div>
                <h2>Forgot Password?</h2>
                <form onSubmit={this.sendEmail}>
                    <label>Please enter your email. We'll send you a password reset link:</label>
                    <input type="email" placeholder="Email"/>
                    <div className="btns"><Button variant="contained">Send Email</Button></div>
                </form>
            </div>
        )
    }
}