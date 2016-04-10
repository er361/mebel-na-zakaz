import React from 'react';
import Relay from 'react-relay';

import {RaisedButton, TextField, SelectField, MenuItem} from 'material-ui';
import { Form } from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
import FileReaderInput from 'react-file-reader-input';
import request from 'superagent';
import AddMebelMutation from '../../mutations/mebel/AddMebelMutation';


const MebelCreateForm  = React.createClass({
  getInitialState(){
    return {
      mebelName: '',
      canSubmit: false,
      file: null,
      preview: null,
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
       //console.log(`Successfully uploaded ${file.name}!`);
     });
     //console.log(model);
     this.props.onSave(model);
     this.refs.form.reset();
     this.setState({
       preview: null
     });
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

    //console.log(results);
    var preview = results[0][0].target.result;

    this.setState({
      file: results,
      preview: preview
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
            {/* file upload block*/}
            <div className='col-md-12'>
              <div className='col-md-6'>
                {this.state.preview ? <img  className='img-thumbnail' src={this.state.preview} /> : null }
              </div>
              <br />
              <FileReaderInput as='url' accept='image/*' name='image' onChange={this.handleChange}>
                <RaisedButton label='Upload file' />
              </FileReaderInput>
              <br />
            </div>
            {/* file upload end*/}
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
