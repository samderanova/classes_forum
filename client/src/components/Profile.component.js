import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {url} from '../index'
import {Button, CircularProgress} from '@material-ui/core';
import FormData from 'form-data';
import fs from 'fs';
import '../styles/profile.scss'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        this.update = this.update.bind(this);
        this.updatePic = this.updatePic.bind(this);
    }
    update(e) {
        e.preventDefault()
        var inputs = document.getElementsByClassName('update-input')
        if ((inputs[0].value.trim() === '' && inputs[1].value.trim() !== '') || (inputs[0].value.trim() !== '' && inputs[1].value.trim() === '')) {
            ReactDOM.render(<p>Please fill out both fields!</p>, document.getElementById('warning'))
        }
        else {
            if (inputs[0].value.trim() !== '') {
                axios.get(`${url}/api/`)
                    .then(res => {
                        for (var user of res.data) {
                            if (user.email === Object.keys(localStorage)[0]) {
                                user.contacts[inputs[0].value] = inputs[1].value
                                axios.put(`${url}/api/updateprofile/${user._id}`, {
                                    contacts: user.contacts
                                })
                                .then(window.location.reload())
                                .catch(err => console.log(err))
                            }
                        }
                    })
                    .catch(err => console.logg(err))
            }
        }
    }
    updatePic(e) {
        e.persist()
        axios.get(`${url}/api`)
            .then(res => {
                for (var user of res.data) {
                    if (user.email === Object.keys(localStorage)[0]) {
                        var data = new FormData();
                        data.append('picture', e.target.files[0], e.target.files[0].name);
                        axios.put(`${url}/api/updateprofile/${user._id}`, {
                            pic: data
                        })
                            .then(/*window.location.reload()*/)
                            .catch(err => console.log(err))
                    }
                }
            })
        console.log(e.target.files[0]);
    }
    componentDidMount() {
        if (localStorage.length > 0) {
            axios.get(`${url}/api/`)
                .then(res => {
                    let user = Object.keys(localStorage)[0]
                    for (var u of res.data) {
                        if (u.email === user) {
                            this.setState({loading: false})
                            ReactDOM.render(
                                <div>
                                    <div id="pic" style={{
                                        boxShadow: '0 0 2px gray ',
                                        borderRadius: '100%',
                                        margin: '50px auto 10px auto',
                                        width: 100, height: 100,
                                        backgroundImage: `url(${u.pic}`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        backgroundSize: 'contain'}}>
                                    </div>
                                    <form>
                                        <label htmlFor="getFile" style={{
                                            cursor: 'pointer',
                                            color: '#1a73e9'
                                            }}>Change Picture</label>
                                        <input id="getFile" style={{display: 'none'}} type="file" onChange={this.updatePic}/>
                                    </form>
                                </div>,
                                document.getElementById('pic')
                            )
                            var listClasses = u.classes.map(c => <p key={c}>{c}</p>)
                            var rows = []
                            for (var item of Object.keys(u.contacts)) {
                                rows.push(
                                    <tr key={item}>
                                        <td style={{padding: 10}} >{item}</td>
                                        <td style={{padding: 10}}>{u.contacts[item]}</td>
                                    </tr>
                                )
                            }
                            ReactDOM.render(
                                <div>
                                    <h1>{u.name}</h1>
                                    <div>{listClasses}</div>
                                    {Object.keys(u.contacts).length > 0 ? 
                                    <table style={{
                                        border: '1px solid black',
                                        borderCollapse: 'collapse',
                                        fontSize: 15,
                                        margin: 'auto'}}>
                                        <thead>
                                            <tr>
                                                <th style={{padding: 10}}>Platform</th>
                                                <th style={{padding: 10}}>Link/Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows}
                                        </tbody>
                                    </table>
                                    :
                                        null
                                    }
                                    
                                </div>,
                                document.getElementById('info')
                            )
                        }
                    }
                })
                .catch(err => console.log(`Error: ${err}`))
        }
        else {
            window.location.href = '/login'
        }
    }
    render() {
        return (
            <div className="Profile">
                {this.state.loading ? 
                <CircularProgress />
                :
                <div>
                    <div id='pic'></div>
                    <div id='info'></div>
                    <div className="settings">
                        <h2>Settings</h2>
                        <form onSubmit={this.update}>
                            <h2>Add Contact Info</h2>
                            <input className="update-input" placeholder="Platform"/><span>&nbsp;&nbsp;</span>
                            <input className="update-input" placeholder="Link/Profile Name"/>
                            <br></br><br></br>
                            <Button style={{borderRadius: 0, color: 'white'}} variant='contained' type='submit'>Update Contacts</Button>
                        </form>
                        <div id="warning"></div>
                    </div>
                </div>
                }
            </div>
        )
    }
}