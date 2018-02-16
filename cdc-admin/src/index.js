import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AutorBox from './Autor';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home';
import LivroBox from './Livro';

ReactDOM.render(
    (
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/autor" component={AutorBox} />
                    <Route exact path="/livro" component={LivroBox} />
                </Switch>
            </App>
        </Router>

    ),

    document.getElementById('root'));

registerServiceWorker();
