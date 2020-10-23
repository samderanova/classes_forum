import React, {Component} from 'react'; 
import ReactDOM from 'react-dom';
import {Button, CircularProgress} from '@material-ui/core';
import axios from 'axios';
import {url} from '../index';
import '../styles/register.scss';
import uci_logo from './uci_logo.png';

const red_styles = {
    color: 'red'
}
export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            chosenClasses: []
        }
        this.register = this.register.bind(this)
        this.addClasses = this.addClasses.bind(this)
        this.removeClasses = this.removeClasses.bind(this)
    }
    componentDidMount() {
        var search = document.getElementById('classes')
        search.addEventListener('keyup', (e, s=search) => {
            if (e.key === 'Enter') {
                s = search.value
                if (s !== '') {
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
                    ReactDOM.render(<p style={red_styles}>Please provide a class name!</p>,
                        document.getElementById('warning'))
                }
            }
        })
    }
    register(e) {
        e.preventDefault(); // on default, submitting the form will refresh the page; this prevents that
        // get all input elements inside the form
        var inputs = Array.from(document.getElementsByClassName('reg-input'));
        var inputvals = inputs.map(el => el.value.trim())
        if (this.state.chosenClasses.length === 0) {
            document.getElementById('classes').style.border= '3px solid red';
        }
        axios.get(`${url}/api/`)
            .then(res => {
                for (var user of res.data) {
                    if (user.email === inputvals[1]) {
                        ReactDOM.render(<p style={red_styles}>This email has an existing account!</p>,
                            document.getElementById('warning'))
                            return
                    }
                }
                axios.post(`${url}/api/adduser`, {
                    name: inputvals[0],
                    email: inputvals[1],
                    password: inputvals[4],
                    pic: uci_logo,
                    major: inputvals[2],
                    year: inputvals[3],
                    classes: this.state.chosenClasses,
                    contacts: {"contacts": null}
                })
                    .then(_ => {
                        localStorage.setItem(inputvals[1], true)
                        window.location.href = '/profile'
                    })
                    .catch(err => {
                        console.log(err)
                        for (var el of inputs) {
                            if (el.innerText.trim() === '') {
                                el.style.border = '3px solid red';
                                ReactDOM.render(<p style={red_styles}>Please make sure you fill out every field!</p>,
                                    document.getElementById('warning'))
                            }
                        }
                    })
            })
    }
    addClasses(e) {
        e.persist()
        this.setState((prevState) => {
            if (e.target.localName === 'button') {
                if (prevState.chosenClasses.includes(e.target.children[0].innerText)) {
                    ReactDOM.render(<p style={red_styles}>This class has already been added!</p>,
                        document.getElementById('warning'))
                }
                else {
                    prevState.chosenClasses.push(e.target.children[0].innerText)
                    return {chosenClasses: prevState.chosenClasses}
                }
            }
            else {
                if (prevState.chosenClasses.includes(e.target.innerText)) {
                    ReactDOM.render(<p style={red_styles}>This class has already been added!</p>,
                        document.getElementById('warning'))
                }
                else {
                    prevState.chosenClasses.push(e.target.innerText)
                    return {chosenClasses: prevState.chosenClasses}
                }
            }
        })
    }
    removeClasses(e) {
        e.persist()
        this.setState((prevState) => {
            if (e.target.localName === 'button') {
                prevState.chosenClasses = prevState.chosenClasses.filter(c => c !== e.target.children[0].innerText)
            }
            else {
                prevState.chosenClasses = prevState.chosenClasses.filter(c => c !== e.target.innerText)
            }
            return {chosenClasses: prevState.chosenClasses}
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
                    <div id="chosenClasses"  style={{paddingBottom: '30px'}}>
                        <h3>Classes Added (click to remove):</h3>
                        {this.state.chosenClasses.map(el => {
                            return <Button key={el} variant="contained" onClick={this.removeClasses}>{el}</Button>
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