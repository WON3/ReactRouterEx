import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CreateTodo from './views/Create_Todo/Create_Todo';
import EditTodo from './views/Edit_Todo/Edit_Todo';
import Dashboard from './views/Dashboard/Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path={`/create`} component={CreateTodo}/>
            <Route path={`/edit/:id`} component={EditTodo}/>
            <Route path={`/`} component={Dashboard}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
