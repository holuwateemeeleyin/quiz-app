import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './component/home/home';
import Questions from './component/questions'
import TestScore from './container/testScore'
class Routes extends Component {
    render(){
        return (
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/questions" exact component={Questions}/>
                    <Route path="/testscore" exact component={TestScore}/>
                </Switch>
            
        )
    }
}




export default Routes;