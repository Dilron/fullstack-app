import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Dashboard from './components/Dashboard/Dashboard'

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path='/dashboard' component={Dashboard} />
    </Switch>
)