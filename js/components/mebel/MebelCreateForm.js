import React from 'react';
import Relay from 'react-relay';

import {RaisedButton, TextField, SelectField, MenuItem} from 'material-ui';
import { Form } from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import FileReaderInput from 'react-file-reader-input';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import AddMebelMutation from '../../mutations/mebel/AddMebelMutation';


const MebelCreateForm  = React.createClass({
  getInitialState(){
    return {
      mebelName: '',
      canSubmit: false,
      file: null,
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
      let results = this.state.file;
      //upload file
      results.forEach(result => {
       const [e, file] = result;
       model.file = file.name;
       this.uploadFile(e.target.result,file);
       console.log(`Successfully uploaded ${file.name}!`);
     });
     console.log(model);
     this.props.onSave(model);
     this.refs.form.reset();
  },
  showData(data){
    console.log(data);
  },
  uploadFile(fileBin,file){
    request.post('/upload')
            .attach('file',file)
            .attach('image',fileBin)
            .end((err, res) => {
              err ? console.log(err) : console.log(res);
            });
  },
  handleChange(e,results){
    this.setState({
      file: results
    });

  },
  render(){
    var style = {
      marginBottom: 20,
      dropZone: {
        border: '1px solid white',
      },
      preview: {
        width: 200,
        heigth: 150
      }
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
            <FormsyText
              hintText='Название мебели'
              name='mebelName'
              validations={validations}
              validationErrors={validationErrors}
              required/>
            <br />
            <div className='col-md-12'>
              <FileReaderInput as='buffer' accept='image/*' name='image' onChange={this.handleChange}>
                <RaisedButton label='Upload file' />
              </FileReaderInput>
              <br />
            </div>
              <FormsySelect
                name='category'
                required
                floatingLabelText='Название категории'>
                 {this.props.categories.edges.map(edge =>
                 <MenuItem value={edge.node.id} primaryText={edge.node.name} key={edge.node.id} />)}
              </FormsySelect>
          <br />
          <RaisedButton   label='Submit' primary={true} type='submit'   disabled={!this.state.canSubmit} />
        </Form>
      </div>
    )
  }
})
export {MebelCreateForm}
export default Relay.createContainer(MebelCreateForm, {
  fragments:{
    categories: () => Relay.QL `
      fragment on categoryConnection{
        count
        edges{
          node{
            id
            name
          }
        }
      }
    `
  }
})
