import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContactDetails extends Component {

  constructor(props){
    super(props);

    this.state={
      isEdit:false,
      name:'',
      phone:''
    };

    this._handleToggle=this._handleToggle.bind(this);
    this._handleChange=this._handleChange.bind(this);
    this._handleEdit=this._handleEdit.bind(this);
    this._handleKeyPress=this._handleKeyPress.bind(this);
  }


  _handleEdit(){
    this.props.onEdit(this.state.name,this.state.phone);

  }

  _handleToggle(){
    if(!this.props.isSelected){
      return;
    }

    if(!this.state.isEdit){
      this.setState({
        name:this.props.contact.name,
        phone:this.props.contact.phone
      });
    } else {
      this._handleEdit();
    }

    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  _handleChange(e){
    let nextState={};
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);
  }

  _handleKeyPress(e){
    if(e.charCode===13){ /*enter key*/
      this._handleToggle();
    }

  }


  render(){


    const details =(
      <div>
        <p>{this.props.contact.name}</p>
        <p>{this.props.contact.phone}</p>
      </div>
    );

    const edit=(
      <div>
        <p>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this._handleChange}
          />
        </p>
        <p>
          <input
            type="text"
            name="phone"
            placeholder="phone"
            value={this.state.phone}
            onChange={this._handleChange}
            onKeyPress={this._handleKeyPress}
          />
        </p>
      </div>
    )
    const view=this.state.isEdit ? edit:details;

    const blank=(<div>Not Selected</div>);
    return(

      <div>
        <h1>Details</h1>
        {this.props.isSelected ? view : blank}
        <p>
          <button onClick={this._handleToggle}>{this.state.isEdit ? 'ok':'edit'}</button>
          <button onClick={this.props.onRemove}>remove</button>
        </p>
      </div>

    )
  }
}

/* 미선택시 props 값이 undefined error */
ContactDetails.defaultProps={
  contact :{
    name:'',
    phone:''
  },
  onRemove: ()=>{ console.error('onRemove not defined')},
  onEdit: ()=>{ console.error('onEdit not defined')}
}

ContactDetails.propTypes={
  contact:PropTypes.object,
  onRemove:PropTypes.func,
  onEdit:PropTypes.func
}
