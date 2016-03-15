import React from 'react';
import Relay from 'react-relay';

import injectTapEventPlugin from 'react-tap-event-plugin';

import MebelList from './mebel/MebelList';
import Mebel from './mebel/Mebel';
import MebelCreateForm from './mebel/MebelCreateForm';
import CategoryCreateForm from './category/CategoryCreateForm';

// import AddMebelMutation from '../mutations/mebel/AddMebelMutation';
// import DeleteMebelMutation from '../mutations/mebel/DeleteMebelMutation';
//
// import AddCategoryMutation from '../mutations/category/AddCategoryMutation';



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
   handleSave(model){

     console.log(model);
   },
  render(){
    var style = {
      h3:{
        textAlign: 'center'
      }
    };
    const categorys = this.props.viewer.categorys;
    return(
        <div className='container'>

          <MebelCreateForm categoryList={categorys} onSave={this.handleSave} />
          <hr />
              <MebelList categoryList={categorys}  viewer={this.props.viewer} />
        </div>
    )
  }
})

export default Relay.createContainer(App, {
  prepareVariables(){
    return {
      limit: 100
    };
  },
  fragments: {
    viewer: () => Relay.QL`
    fragment on Viewer {
      __typename
      categorys(first: $limit){
        edges{
          node{
            id
            name
            ${Mebel.getFragment('category')}
          }
        }
        ${MebelList.getFragment('categoryList')}
      }
      ${MebelList.getFragment('viewer')}
    }
    `
  }
});
