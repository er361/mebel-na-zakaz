import React from 'react';
import Relay from 'react-relay';

import injectTapEventPlugin from 'react-tap-event-plugin';

import MebelList from './mebel/MebelList';
import Mebel from './mebel/Mebel';
import MebelCreateForm from './mebel/MebelCreateForm';
import CategoryCreateForm from './category/CategoryCreateForm';
import CategoryList from './category/CategoryList';

import AddMebelMutation from '../mutations/mebel/AddMebelMutation';

 import AddCategoryMutation from '../mutations/category/AddCategoryMutation';



import {Paper,Divider, GridList, GridTile} from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import MyRawTheme from '../theme/theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
injectTapEventPlugin();

const App = React.createClass({
  //the key passed through context must be called "muiTheme"
   childContextTypes : {
     muiTheme: React.PropTypes.object,
   },
   getChildContext() {
     return {
       muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
     };
   },
   showData(data){
     console.log(data)
   },
   handleMebelSave(model){
     //console.log(model);
     Relay.Store.commitUpdate(new AddMebelMutation({
       categoryId: model.category,
       name: model.mebelName,
       viewer:this.props.viewer
     }))
   },
   handleCatSave(model){
     //console.log(model);
     Relay.Store.commitUpdate(new AddCategoryMutation({
       name: model.catName,
       viewer: this.props.viewer
     }))
   },
  render(){
    var style = {
      root: {
        marginTop: 50,
        paddingTop: 50,
        paddingBottom: 50
      },
      h3:{
        textAlign: 'center'
      }
    };
    const mebels = this.props.viewer.mebels;
    const categories = this.props.viewer.categorys;
    return(
        <Paper className='container' style={style.root}>
          <div className='row'>
            <div className='col-md-5 col-md-offset-1'>
              <MebelCreateForm  categories={categories} onSave={this.handleMebelSave} />
              <MebelList viewer={this.props.viewer} mebels={mebels}  />
            </div>
            <div className='col-md-5 col-md-offset-1'>
              <CategoryCreateForm  onSave={this.handleCatSave} />
              <CategoryList viewer={this.props.viewer } categories={categories} />
            </div>
          </div>


        </Paper>
    )
  }
})

export default Relay.createContainer(App, {
  prepareVariables(){
    return {
      limit: 100
    }
  },
  fragments: {
    viewer: () => Relay.QL`
    fragment on Viewer {
      __typename
      mebels(first: $limit){
        ${MebelList.getFragment('mebels')}
      }
      ${MebelList.getFragment('viewer')}
      ${AddMebelMutation.getFragment('viewer')}
      ,
      categorys(first: $limit){
        ${CategoryList.getFragment('categories')}
        ${MebelCreateForm.getFragment('categories')}
      }
      ${CategoryList.getFragment('viewer')}
      ${AddCategoryMutation.getFragment('viewer')}
    }
    `
  }
});
