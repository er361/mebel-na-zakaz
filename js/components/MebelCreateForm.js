import React from 'react';

import {RaisedButton, TextField} from 'material-ui';

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
    this.cleanValue();
    console.log(this.refs.mebelName.getValue());
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
