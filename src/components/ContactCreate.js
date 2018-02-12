import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContactCreate extends Component {

  constructor(props) {
    super(props);
    this.state={
      name: '',
      phone: ''
    }
    this._handleChange=this._handleChange.bind(this);
    this._handleClick=this._handleClick.bind(this);
    this._handleKeyPress=this._handleKeyPress.bind(this);
  }

  _handleChange(e){
    let nextState={};
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);
  }

  _handleClick(){
    const contact={
      name:this.state.name,
      phone:this.state.phone
    };

    this.props.onCreate(contact);
    this.setState({
      name:'',
      phone:''
    })

    this.nameInput.focus();
  }

  _handleKeyPress(e){
    if(e.charCode===13){ /*enter key*/
      this._handleClick();
    }

  }

  render(){
    return(
    <div>
      <h1>Create Contact</h1>
      <p>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={this.state.name}
          onChange={this._handleChange}
          ref={(ref)=>{this.nameInput=ref}}
          />
        <input
          type="text"
          name="phone"
          placeholder="phone"
          value={this.state.phone}
          onChange={this._handleChange}
          onKeyPress={this._handleKeyPress}
          />
      </p>
      <button onClick={this._handleClick}>Create</button>
    </div>
    )
  }
}

ContactCreate.propTypes={
  onCreate: PropTypes.func
};

ContactCreate.defaultProps={
  onCreate:()=>{console.error('onCreate not defined');}
}
