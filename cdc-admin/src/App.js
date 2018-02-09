import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';

import $  from 'jquery';
import axios from 'axios';
import {FormularioAutor, TabelaAutores} from './Autor';

class App extends Component {

  constructor() {
    super();
    this.state = {lista : []};
  }

  componentDidMount() {    
    $.ajax({
      url: "http://localhost:8080/api/autores",
      dataType: "json",
      success:  function(resposta) {
        this.setState({ lista:resposta });
      }.bind(this)
    });
  }
  
  render() {
    
    return (

      <div id="layout">
      <a href="#menu" id="menuLink" className="menu-link">            
          <span></span>
      </a>
      <div id="menu">
          <div className="pure-menu">
              <a className="pure-menu-heading" href="#">Company</a>
              <ul className="pure-menu-list">
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                  <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
              </ul>
          </div>
      </div>

    <div id="main">
        <div className="header">
          <h1> -  -  - </h1>
        </div>

        <div className="content" id="content">

          

          <FormularioAutor />
          <TabelaAutores />          
        </div>

      </div>            
    </div>

    );

  }

}

export default App;
