import React, {Component} from 'react'; 
import ReactDOM from 'react-dom';
import {Button, CircularProgress} from '@material-ui/core';
import axios from 'axios';
import {url} from '../index';
import '../styles/register.scss';

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            chosenClasses: []
        }
        this.register = this.register.bind(this)
        this.addClasses = this.addClasses.bind(this)
    }
    componentDidMount() {
        var search = document.getElementById('classes')
        search.addEventListener('keyup', (e, s=search.value) => {
            if (e.key === 'Enter') {
                if (s.trim() !== '') {
                    ReactDOM.render(<CircularProgress />, document.getElementById('chooseClasses'))
                    axios.get(`${url}/api/getclasses`)
                    .then(res => {
                        let words = s.split(' ').map(word => word.toUpperCase())
                        let results = [];
                        if (words.length === 1) {
                            results = res.data.filter(c => {
                                if (words[0].length === 1) return c.startsWith(words[0])
                                else return c.includes(words[0])
                            }).map(c => {
                                return <Button variant="contained" key={c} onClick={this.addClasses}>{c}</Button>
                            })
                        }
                        else {
                            results = res.data.filter(c => c.includes(words.join(' '))).map(c => {
                                return <Button variant="contained" key={c} onClick={this.addClasses}>{c}</Button>;
                            })
                        }
                        if (results.length === 0) {
                            ReactDOM.render(
                                <p>Sorry, no classes found! Please ensure you entered the class name correctly.</p>,
                                document.getElementById('chooseClasses'))
                        }
                        else {
                            ReactDOM.render(results.length > 5 ? results.slice(0, 5) : results,
                            document.getElementById('chooseClasses'))
                        }
                    })
                    .catch(err => console.log(`Error: ${err}`))
                }
                else {
                    e.target.style.border = '3px solid red';
                    ReactDOM.render(<p style={{color: 'red'}}>Please provide a class name!</p>,
                        document.getElementById('warning'))
                }
            }
        })
    }
    register(e) {
        e.preventDefault(); // on default, submitting the form will refresh the page; this prevents that
        // get all input elements inside the form
        var inputs = Array.from(document.getElementsByClassName('reg-input')).map(el => el.value);
        try {
            axios.post(`${url}/api/adduser`, {
                name: inputs[0],
                email: inputs[1],
                password: inputs[4],
                pic: '',
                major: inputs[2],
                year: inputs[3],
                classes: []
            })
                .then(_ => console.log('Success!'))
                .catch(err => console.log(err))
        }
        catch(err) {
            for (var el of inputs) {
                if (el.value.trim() === '') {
                    el.style.border = '3px solid red';
                    ReactDOM.render(<p style={{color: 'red'}}>Please make sure you fill out every field!</p>,
                        document.getElementById('warning'))
                }
            }
        }
    }
    addClasses(e) {
        e.persist()
        this.setState((prevState) => {
            if (e.target.localName === 'button') {
                if (prevState.chosenClasses.includes(e.target.children[0].innerHTML)) {
                    ReactDOM.render(<p style={{color: 'red'}}>This class has already been added!</p>,
                        document.getElementById('warning'))
                }
                else {
                    prevState.chosenClasses.push(e.target.children[0].innerHTML)
                    return {chosenClasses: prevState.chosenClasses}
                }
            }
            else {
                if (prevState.chosenClasses.includes(e.target.innerHTML)) {
                    ReactDOM.render(<p style={{color: 'red'}}>This class has already been added!</p>,
                        document.getElementById('warning'))
                }
                else {
                    prevState.chosenClasses.push(e.target.innerHTML)
                    return {chosenClasses: prevState.chosenClasses}
                }
            }
        })
    }
    render() {
        return (
            <div className="Register">
                <form id="reg-form">
                    <h2>Register</h2>
                    <input className="reg-input" type="text" name="name" placeholder="Name" /><br></br>
                    <input className="reg-input" type="email" name="email" placeholder="Email" /><br></br>
                    <input className="reg-input" type="text" name="major" placeholder="Major"/><br></br>
                    <input className="reg-input" type="password" name="password" placeholder="Password"/><br></br>
                    <input className="reg-input" type="password" name="confirmpass" placeholder="Confirm Password" /><br></br><br></br>
                    <label>Classes (exactly as from  UCI Catalogue)</label><br></br><br></br>
                    <input id="classes" type="search" name="classes" placeholder="e.g. I&C SCI 32"/><br></br>
                    <div id="chooseClasses"></div>
                    <div id="chosenClasses">
                        {this.state.chosenClasses.map(el => {
                            return <Button key={el} variant="contained">{el}</Button>
                        })}
                    </div>
                    <label>Year:</label><br></br>
                    <select name="year" id="year">
                        <option value="freshman">Freshman</option>
                        <option value="sophomore">Sophomore</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                    </select><br></br>
                    <div id="warning"></div>
                    <div className="btns">
                        <Button variant="contained" onClick={this.register}>Register</Button>
                    </div>
                </form>
            </div>
        )
    }
}