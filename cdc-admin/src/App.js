import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $  from 'jquery';
import AutorBox from './Autor';
import { Link } from 'react-router-dom';

class App extends Component {
  
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
                <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Autor</Link></li>
                <li className="pure-menu-item"><Link to="/livro" className="pure-menu-link">Livro</Link></li>
              </ul>
          </div>
      </div>

    <div id="main">
        <div className="header">
          <h1> Tela Inicial </h1>
        </div>
        <div className="content" id="content">
            {this.props.children}
        </div>
      </div>            
    </div>

    );

  }

}

export default App;
