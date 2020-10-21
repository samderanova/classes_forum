import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {url} from '../index'
import {Button, CircularProgress} from '@material-ui/core';
import '../styles/profile.scss'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        this.update = this.update.bind(this);
    }
    update(e) {
        e.preventDefault()
        console.log(e)
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
                                <img src={u.pic} style={{width: 100, height: 100}}/>,
                                document.getElementById('pic')
                            )
                            var listClasses = u.classes.map(c => <p key={c}>{c}</p>)
                            ReactDOM.render(
                                <div>
                                    <h1>{u.name}</h1>
                                    {listClasses}
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
                            <input id='picfile' type='file' accept='image/*' />
                            <Button variant='contained' type='submit'>Update</Button>
                        </form>
                    </div>
                </div>
                }
            </div>
        )
    }
}