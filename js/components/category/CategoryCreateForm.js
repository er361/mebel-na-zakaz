import React from 'react';
import Relay from 'react-relay';

import {RaisedButton, TextField} from 'material-ui';
import { Form } from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

const CategoryCreateForm = React.createClass({
  getInitialState(){
    return {
      catName: '',
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

  submitForm(model){
      this.props.onSave(model);
      //доделать валидацию  'else'
     this.refs.form.reset();
  },
  render(){
    var style = {
      marginBottom: 20,
    }
    var validations = {
      minLength: 3,
      matchRegexp: /^[а-яА-Я0-9]+$/
    }
    var validationErrors = {
      minLength: 'Слишком короткое название',
      matchRegexp: 'Допускаеться только символы кирилицы и цифры'
    }
    return(
      <div style={style}>
        <Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          ref='form'>

          {/* Category name field*/}
          <FormsyText
            hintText='Название категории'
            name='catName'
            validations={validations}
            validationErrors={validationErrors}
            required
            />

          <br />
          <RaisedButton  label='Submit' primary={true} type='submit'   disabled={!this.state.canSubmit} />
        </Form>
      </div>
    )
  }
})
export default CategoryCreateForm;
