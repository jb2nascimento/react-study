import React, {Component} from 'react';

export default class Combo extends Component {

    render() {

        return(            
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <select id={this.props.id} name={this.props.name} onChange={this.props.onChange}>
                    <option value="">{this.props.selecione}</option>
                    {
                        this.props.lista.map
                        (                            
                            item => <option value={ item + '.' + this.props.propValue }> { item + '.' + this.props.propLabel } </option>
                        )
                    }
                </select>
            </div>
        )
    }



}