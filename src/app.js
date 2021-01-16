import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Navbar } from './components'
import Home from './Home'
import History from './History'



export default class app extends Component {
    render() {
        return (
            <BrowserRouter >
                <Navbar />
                <Route exact path="/" component={Home} />
                <Route exact path="/history" component={History} />
            </BrowserRouter>
        )
    }
}
