import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import RenderUser from './RenderUser.component';
import {url} from '../index';
import {Button, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
import '../styles/home.scss';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        axios.get(`${url}/api/`)
            .then(res => {
                this.setState({users: res.data})
            })
    }
    render() {
        var rows = []
        for (var i=0; i<this.state.users.length; i++) {
            rows.push(
                <RenderUser key={i} user={this.state.users[i]} />
            )
        }
        return (
            <div className="Home">
                {Object.keys(localStorage).length > 0 ? 
                <div style={{padding: 50, width: '100%'}}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><h3>Name</h3></TableCell>
                                    <TableCell><h3>Classes</h3></TableCell>
                                    <TableCell><h3>Contacts</h3></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                :
                <Paper style={{margin: '30px 20px'}}>
                    <div className='container'>
                        <h1>Welcome to ZotConnect!</h1>
                        <p>We're glad you're here.</p>

                        <p>
                            As students begin each quarter, they flood their social media accounts with 
                            pictures of their class schedules, asking over and over again if people also
                            registered for the classes they are in.
                        </p>
                        <p>
                            But with <b>ZotConnect</b>, there's no more need for such
                            a repetitive process! Simply sign up with your school email, enter the classes
                            you have, and you'll be automatically placed in group chats for those classes.
                        </p>
                        <p>Mission accomplished! You can now meet as many new people as you want!</p>

                        <div className="btns">
                            <Link to='/login'><Button variant="contained">Login</Button></Link>
                            <Link to='/register'><Button variant="contained">Register</Button></Link>
                        </div>
                    </div>
                </Paper>
                }
                
            </div>
        )
    }
}