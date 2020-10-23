import React from 'react'
import { TableRow, TableCell, Icon } from '@material-ui/core'

export default function RenderPlayer(props) {
    let user = props.user
    var classes = [], contacts = []
    if (user.classes) {
        for (var i=0; i<user.classes.length; i++) {
            classes.push(
                <li key={i} style={{padding: 5, listStyleType: 'none'}}>{user.classes[i]}</li>
            )
        }
    }
    if (user.contacts) {
        for (var i=0; i<Object.keys(user.contacts).length; i++) {
            var platform = Object.keys(user.contacts)[i]
            if (user.contacts[platform] === null) continue
            contacts.push(
                <li key={i} style={{listStyleType: 'none'}}>{platform}: {user.contacts[platform]}</li>
            )
        }
    }
    return (
        <TableRow>
            <TableCell>{user.name}</TableCell>
            <TableCell><ul style={{padding: 0}}>{classes}</ul></TableCell>
            <TableCell><ul style={{padding: 0}}>{contacts}</ul></TableCell>
        </TableRow>
    )
}