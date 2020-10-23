import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import zcl from './ZotConnect_Logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" className={classes.title} >
                    <div>
                      <img src={zcl} style={{width: 100, verticalAlign: 'middle'}}></img>
                      <Link to='/' style={{color: 'white', textDecoration: 'none', verticalAlign: 'middle'}}>ZotConnect</Link>
                    </div>
                </Typography>
                {localStorage.length > 0 ? 
                <div>
                  <Link to='/profile' style={{color: 'white', textDecoration: 'none'}}><Button color='inherit'>Profile</Button></Link>
                  <Button color='inherit' onClick={_ => {localStorage.clear(); window.location.href='/';}}>Logout</Button>
                </div>
                : 
                <Link to='/login' style={{color: 'white', textDecoration: 'none'}}><Button color="inherit">Login</Button></Link>
                }
                </Toolbar>
            </AppBar>
        </div>
    )
}