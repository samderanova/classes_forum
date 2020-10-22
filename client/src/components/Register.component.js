import React, {Component} from 'react'; 
import {Button} from '@material-ui/core'
import axios from 'axios';
import {url} from '../index'
import '../styles/register.scss'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
    }
    componentDidMount() {
        
        
    }
    register(e) {
        e.preventDefault(); // on default, submitting the form will refresh the page; this prevents that

        // get all input elements inside the form
        var inputs = Array.from(e.target.children).filter(child => child.outerHTML !== '<br>').filter(child => child.localName !== 'label').map(input => input.value)
        var classes = inputs[6].split(',')
        axios.post(`${url}/api/adduser`, {
            name: inputs[0],
            email: inputs[1],
            password: inputs[4],
            pic: '',
            major: inputs[2],
            year: inputs[3],
            classes: classes
        })
            .then(_ => console.log('Success!'))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="Register">
                <form onSubmit={this.register}>
                    <h2>Register</h2>
                    <input type="text" name="name" placeholder="Name" /><br></br>
                    <input type="text" name="email" placeholder="Email" /><br></br>
                    <input type="text" name="major" placeholder="Major"/><br></br>
                    <input type="password" name="password" placeholder="Password"/><br></br>
                    <input type="password" name="confirmpass" placeholder="Confirm Password" /><br></br><br></br>
                    <label>Classes (exactly as from  UCI Catalogue)</label><br></br><br></br>
                    <input type="text" name="classes" placeholder="I&C SCI 32, MATH 2A, ENGR 7A" /><br></br><br></br>
                    <label>Year:</label><br></br>
                    <select name="year" id="year">
                        <option value="freshman">Freshman</option>
                        <option value="sophomore">Sophomore</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                    </select><br></br>

                    <div className="btns"><Button variant="contained" type="submit">Register</Button></div>

                </form>
            </div>
        )
    }
}