import React, {Component} from 'react';
import $ from 'jquery';
import Input from './componentes/Input';
import Botao from './componentes/Botao';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';
import Combo from './componentes/Combo';

export class FormularioLivro extends Component {

    constructor() {  
        super();          
        this.state = { lista : [], id:'', titulo:'', preco:'', autorId:'' };

        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
      }

      render() {                   
          return(
              <div className="pure-form pure-form-aligned">
                  <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">                
                    <Input id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Titulo" />
                    <Input id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setPreco}  label="Preço" />                     
                    <Combo id="autores" label="Autor" selecione="Selecione o Autor" onChange={this.setAutorId} data={this.props.autores} propValue="id" propLabel="nome" />
                    <Botao type="submit" className="pure-button pure-button-primary" label="Gravar" />
                  </form>
              </div>
          );
      }
  
      enviaForm(evento) {
  
          evento.preventDefault();
          console.log("dados sendo enviados");
      
          $.ajax({
            url:"http://localhost:8080/api/livros",
            contentType: 'application/json',
            dataType:'json',
            type:'post',
            data: JSON.stringify({titulo:this.state.titulo,preco:this.state.preco,autorId:this.state.autorId}),
            success: function(novaListagem) {
              PubSub.publish('atualiza-lista-livros', novaListagem);
              this.setState({titulo:'',preco:''});
            }.bind(this),
            error: function(resposta) {
                if(resposta.status === 400) {
                  new TratadorErros().publicaErros(resposta.responseJSON);
                }
            },
            beforeSend: function(){
              PubSub.publish("limpa-erros",{});
            }
  
          });
  
        }
      
        setTitulo(evento){
          this.setState({titulo:evento.target.value});
        }
        
        setPreco(evento){
          this.setState({preco:evento.target.value});
        }
        
        setAutorId(evento){
          this.setState({autorId:evento.target.value});
        }

  }
  

class TabelaLivros extends Component {

    render() {

        return (

            <div>            
            <table className="pure-table">
              <thead>
                <tr>                  
                  <th>Titulo</th>
                  <th>Preço</th>
                  <th>Autor</th>                  
                </tr>
              </thead>
              <tbody>
                {
                  this.props.livros.map
                  (
                    livro =>
                    <tr key={livro.id} >
                      <td>{livro.titulo}</td>
                      <td>{livro.preco}</td>
                      <td>{livro.autor.nome}</td>
                    </tr>
                  )
                }
              </tbody>
            </table> 
        </div>

        );
    }
}


export default class LivroBox extends Component {

    constructor() {
        super();
        this.state = { lista: [], autores: [] }
    }
    
    componentDidMount() {
        
        $.ajax({
            url: 'http://localhost:8080/api/livros',
            dataType: 'json',
            success: function(resposta) {
             this.setState( {lista : resposta} );
            }.bind(this)
        });

        $.ajax({
            url:"http://localhost:8080/api/autores",
            dataType: 'json',
            success: function(resposta) {
              this.setState( {autores : resposta} );
            }.bind(this)
          }
        );

        PubSub.subscribe('atualiza-lista-livros', function(topico, novaListagem) {
            this.setState( { lista: novaListagem });
        }.bind(this));

    }
    
    render() {                
        return (
            <div>
                <div className="header">
                <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro autores={ this.state.autores } />
                    <TabelaLivros livros={this.state.lista} />
                </div>
            </div>
        );
    }



}








