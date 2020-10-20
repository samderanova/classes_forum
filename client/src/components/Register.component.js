import React, {Component} from 'react';
import NewInput from './NewInput.component';
import axios from 'axios';
import {url} from '../index'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
    }
    componentDidMount() {
        /*axios.get('https://api.peterportal.org/rest/v0/courses/all', {
            headers: {'Access-Control-Allow-Origin': '*'},
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))*/
        
    }
    register(e) {
        e.preventDefault();
        var form_children = e.target.children
        console.log(e.target.children)
        for (var child in form_children) {
             
        }
        console.log(form_children)
        /*
        axios.post(`${url}/api/adduser`, {
            
        })*/
    }
    render() {
        return (
            <div>
                <form onSubmit={this.register}>
                    <NewInput label="Name" type="text" placeholder="John Doe"/>

                    <NewInput label="Email" type="text" placeholder="jdoe@uci.edu"/>

                    <label>Year:</label><br></br>
                    <select name="year" id="year">
                        <option value="freshman">Freshman</option>
                        <option value="sophomore">Sophomore</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                    </select>

                    <NewInput label="Major" type="text" placeholder=""/>
                    
                    <NewInput label="Password" type="password" />
                    <NewInput label="Confirm Password" type="password" />
                    <NewInput label="Classes (exactly as in the UCI Catalogue, separated by commas)" type="text" />

                    <input type="submit" />

                </form>
            </div>
        )
    }
}