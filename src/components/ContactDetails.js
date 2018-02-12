import React, { Component } from 'react';

export default class ContactDetails extends Component {


  render(){

    const details =(
      <div>
        <p>{this.props.contact.name}</p>
        <p>{this.props.contact.phone}</p>
      </div>
    );
    const blank=(<div>Not Selected</div>);
    return(

      <div>
        <h1>Details</h1>
        {this.props.isSelected ? details : blank}
        <button>edit</button>
        <button onClick={this.props.onRemove}>remove</button>
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
  onRemove: ()=>{ console.error('onRemove not defined')}
}
