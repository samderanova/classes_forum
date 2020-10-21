import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import '../styles/home.scss';

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <h1>Welcome!</h1>
                <p>We're glad you're here.</p>
                <div className="btns">
                    <Button variant="contained"><Link to='/login'>Login</Link></Button>
                    <Button variant="contained"><Link to='/register'>Register</Link></Button>
                </div>
                <p>As students begin each quarter, they flood their social media accounts with 
                    pictures of their class schedules, asking over and over again if people also
                    registered for the classes they are in.
                </p>
                <p>But with _____ there's no more need for such
                    a repetitive process! Simply sign up with your school email, enter the classes
                    you have, and you'll be automatically placed in group chats for those classes.
                </p>
                <p>Mission accomplished! You can now meet as many new people as you want!</p>
            </div>
        )
    }
}