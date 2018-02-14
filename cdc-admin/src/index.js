import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AutorBox from './Autor';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
    (        
        <Router>
            <Switch>
                <Route exact path="/" component={App} children={AutorBox} >
                    <Route path="/autor" component={AutorBox} />
                    <Route path="/livro" />
                </Route>
            </Switch>
        </Router>
    ),

    document.getElementById('root'));

registerServiceWorker();
