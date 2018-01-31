import React, { Component } from 'react';
import ContactInfo from './ContactInfo.js';

export default class Contact extends Component {

  constructor(props){
    super(props);
    this.state={
      keyword : "",
      contactData: [{
        name:'Abet',
        phone:'010-0000-0001'
      },{
        name:'Betty',
        phone:'010-0000-0002'
      },{
        name:'Charlie',
        phone:'010-0000-0003'
      },{
        name:'David',
        phone:'010-0000-0004'
      }]
    };

    this._handleChange=this._handleChange.bind(this);

  }

  _handleChange(e){
    this.setState({
      keyword:e.target.value
    });
  }

  render(){
    const mapToComponents = (data) => {
      data.sort((a,b)=> { return a.name > b.name; });
      data=data.filter(
        (contact)=>{
          return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
        }
      );


      return data.map((contact,i)=>{
        return (<ContactInfo contact={contact} key={i}/>);
      });
    };

    return (
      <div>
        <h1>Contacts</h1>
        <input
          type="keyword"
          placeholder="Search"
          value={this.state.keyword}
          onChange={this._handleChange}
        />
        <div>{mapToComponents(this.state.contactData)}</div>
      </div>
    );
  }
}
