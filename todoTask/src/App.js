import React, { Component } from 'react';
import TodoTask from './Components/TodoTask';
import TodoTaskUpdate from './Components/TodoTaskUpdate';
import { BrowserRouter, Switch, Route } from "react-router-dom";



class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={TodoTask} />
                    <Route exact path="/update/:id" component={TodoTaskUpdate} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
