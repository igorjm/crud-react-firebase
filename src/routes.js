import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Main from './pages';
import Create from './pages/create'
import Edit from './pages/edit'
import Show from './pages/show'

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/create" component={Create} />
            <Route path="/show/:id" component={Show} />
        </Switch>
    )
}

export default Routes