import React from 'react';
import Relay from 'react-relay';

import {RaisedButton, TextField} from 'material-ui';
import { Form } from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import AddMebelMutation from '../mutations/AddMebelMutation';

const MebelCreateForm  = React.createClass({

  getInitialState(){
    return {
      mebelName: '',
      canSubmit: false
    }
  },
  enableButton(){
    this.setState({
      canSubmit: true
    })
  },
  disableButton(){
    this.setState({
      canSubmit: false
    })
  },
  cleanValue(){
    this.replaceState(this.getInitialState());
  },
  handleInputChange(event) {
    this.setState({
        mebelName: event.target.value
    })
  },
  submitForm(model){
    var name = model.mebelName.trim();
    if(name.length !== 0)
      this.props.onSave(name);
      //доделать валидацию потом 'else'
    this.refs.form.reset();
  },
  render(){
    var style = {
      marginBottom: 20,
    }
    var validations = {
      minLength: 3,
      isWords: true
    }
    var validationErrors = {
      minLength: 'Слишком короткое название',
      isWords: 'только слова'
    }
    return(
      <div style={style}>
        <Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          ref='form'>
          <FormsyText
            hintText='Название мебели'
            name='mebelName'
            validations={validations}
            validationErrors={validationErrors}
            required
            value={this.state.mebelName}
            onChange={this.handleInputChange}/>
          <br />
          <RaisedButton  label='Submit' primary={true} type='submit'  disabled={!this.state.canSubmit} />
        </Form>
      </div>
    )
  }
})
export default MebelCreateForm;
