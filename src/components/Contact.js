import React, { Component } from 'react';
import ContactInfo from './ContactInfo.js';
import ContactDetails from './ContactDetails.js';
import ContactCreate  from './ContactCreate.js';
import update from 'react-addons-update'

export default class Contact extends Component {

  constructor(props){
    super(props);
    this.state={
      selectedKey:-1,
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
    this._handleClick=this._handleClick.bind(this);
    this._handleCreate=this._handleCreate.bind(this);
    this._handleRemove=this._handleRemove.bind(this);
    this._handleEdit=this._handleEdit.bind(this);
  }

  componentWillMount(){ /* 컴포넌트가 DOM 생성 전에 실행 */
    const contactData=localStorage.contactData;

    if(contactData) {
      this.setState({
        contactData:JSON.parse(contactData)
      })
    }
  }

  componentDidUpdate(prevProps,prevState){ /* state 가 업데이트 되었을 때 */
    if(JSON.stringify(prevState.contactData)!=JSON.stringify(this.state.contactData)){
      localStorage.contactData=JSON.stringify(this.state.contactData);
    }

  }



  _handleChange(e){
    this.setState({
      keyword:e.target.value
    });
  }



  _handleClick(key){
    this.setState({
      selectedKey:key
    });

    console.log(key);
  }

  _handleCreate(contact) {
    this.setState({
      contactData : update(this.state.contactData,
        { $push : [contact]}
      )
    });
  }

  _handleRemove(){
    if(this.state.selectedKey<0){
      return;
    }
    this.setState({
      contactData : update(this.state.contactData,
        {$splice: [[this.state.selectedKey,1]]}
      ),
      selectedKey:-1
    });
  }

  _handleEdit(name,phone){
    this.setState({
      contactData: update(this.state.contactData,
        {
          [this.state.selectedKey]:{
            name:{$set:name},
            phone:{$set:phone}
          }
        }
      )
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
        return (
          <ContactInfo
            contact={contact}
            key={i}
            onClick={()=>this._handleClick(i)}/> /* setState -> render -> setState -> ... 무한 루프에 빠지므로 arrow function 사용 */
        );
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
        <ContactDetails
          isSelected={this.state.selectedKey!=-1}
          contact={this.state.contactData[this.state.selectedKey]}
          onRemove={this._handleRemove}
          onEdit={this._handleEdit}
        />
        <ContactCreate
          onCreate={this._handleCreate}/>
      </div>
    );
  }
}
