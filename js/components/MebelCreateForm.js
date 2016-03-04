import React from 'react';
import Relay from 'react-relay';

import {RaisedButton, TextField} from 'material-ui';

import AddMebelMutation from '../mutations/AddMebelMutation';

const MebelCreateForm  = React.createClass({
  getInitialState(){
    return {
      mebelName: undefined
    }
  },
  cleanValue(){
    this.setState({
      mebelName: ''
    })
  },
  handleInputChange(event) {
    this.setState({
        mebelName: event.target.value
    })
  },
  handleSubmit(){
    console.log(this.refs.mebelName.getValue());
    const name = this.refs.mebelName.getValue().trim();
    this.props.onSave(name);
    this.cleanValue();
  },
  render(){
    var style = {
      marginBottom: 20,
    }
    return(
      <div style={style}>
          <TextField hintText='Название мебели' ref='mebelName' value={this.state.mebelName} onChange={this.handleInputChange}/>
          <br />
          <RaisedButton  label='Submit' primary={true}  onClick={this.handleSubmit}/>
      </div>
    )
  }
})
export default MebelCreateForm;
