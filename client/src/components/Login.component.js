import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NewInput from './NewInput.component'

export default class Login extends Component {
    render() {
        return (
            <div>
                <form>
                    <NewInput label="Email" type="text" />
                    <NewInput label="Password" type="password" />
                    <p><Link to='/register'>Create an account</Link></p>
                </form>
            </div>
        )
    }
}