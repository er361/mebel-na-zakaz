import React from 'react';
import Relay from 'react-relay';

import {RaisedButton, TextField, SelectField, MenuItem} from 'material-ui';
import { Form } from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import AddMebelMutation from '../../mutations/mebel/AddMebelMutation';

const MebelCreateForm  = React.createClass({
  getInitialState(){
    return {
      mebelName: '',
      canSubmit: false,
      value: this.props.categoryList.edges[0].node.id
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
    var name = model.mebelName.trim();
    model.mebelName = name;
    //console.log(model);
    if(name.length !== 0)
      this.props.onSave(model);
      //доделать валидацию  'else'
     this.refs.form.reset();
  },
  showData(data){
    console.log(data);
  },
  render(){
    var style = {
      marginBottom: 20,
    }
    var validations = {
      minLength: 3,
      matchRegexp: /^[а-я0-9]+$/

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


            <FormsyText
              hintText='Название мебели'
              name='mebelName'
              validations={validations}
              validationErrors={validationErrors}
              required
              />
            <br />

              <FormsySelect
                name='category'
                required
                floatingLabelText='Название категории'
                 >
                {this.props.categoryList.edges.map(edge =>
                <MenuItem key={edge.node.id} value={edge.node.id} primaryText={edge.node.name}/>)}
              </FormsySelect>

          <br />
          <RaisedButton   label='Submit' primary={true} type='submit'   disabled={!this.state.canSubmit} />
        </Form>
      </div>
    )
  }
})
export default MebelCreateForm;
