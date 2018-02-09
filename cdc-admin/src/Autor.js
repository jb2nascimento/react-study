import React, { Component } from 'react';
import $ from 'jquery';
import Input from './componentes/Input';
import Botao from './componentes/Botao';

export class FormularioAutor extends Component {

    constructor() {
        super();    
        this.state = { lista : [],nome:'',email:'',senha:'' };
        
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    render() {                
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">                
                    <Input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
                    <Input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}  label="E-mail" />
                    <Input id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha}  label="Senha" />                
                    <Botao type="submit" className="pure-button pure-button-primary" label="Gravar" />
                </form>
            </div>
        );
    }

    enviaForm(evento) {
        evento.preventDefault();
        console.log("dados sendo enviados");
    
        $.ajax({
          url:"http://localhost:8080/api/autores",
          contentType: 'application/json',
          dataType:'json',
          type:'post',
          data: JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
          success: function(resposta){
            console.log("enviado com sucesso");
            this.setState({lista:resposta});
          }.bind(this),
          error: function(resposta) {
              console.log("erro");
          }
        });
      }
    
      setNome(evento){
        this.setState({nome:evento.target.value});
      }
      
      setEmail(evento){
        this.setState({email:evento.target.value});
      }
      
      setSenha(evento){
        this.setState({senha:evento.target.value});
      }

}


export class TabelaAutores extends Component {

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

        <div>            
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.lista.map
                  (
                    autor =>
                    <tr key={autor.id} >
                      <td>{autor.nome}</td>
                      <td>{autor.email}</td>
                    </tr>
                  )
                }
              </tbody>
            </table> 
        </div>  

        );

    }
    
}