import React, {Component} from 'react';

export default class Combo extends Component {

    render() {

        return(            
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <select id={this.props.id} name={this.props.name} onChange={this.props.onChange}>
                    <option value="">{this.props.selecione}</option>
                    {
                        this.props.data.map
                        (                            
                            item => <option key={item.id} value={ item.id }> { item.nome } </option>
                        )                        
                    }
                </select>
            </div>
        )
    }



}