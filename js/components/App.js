import React from 'react';
import Relay from 'react-relay';

import injectTapEventPlugin from 'react-tap-event-plugin';

import MebelList from './MebelList';
import Mebel from './Mebel';
import MebelCreateForm from './MebelCreateForm';

import AddMebelMutation from '../mutations/AddMebelMutation';
import DeleteMebelMutation from '../mutations/DeleteMebelMutation';

import {Paper,Divider} from 'material-ui';
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
   handleSave(name){
     Relay.Store.commitUpdate( new AddMebelMutation({
       name,
       viewer: this.props.viewer
     }))
   },
  render(){
    var style = {
      padding: 20,
      width: 500,
      minWidth: 400,
      margin: 'auto'
    };
    const mebels = this.props.viewer.mebels;
    return(
      <div>
        <Paper style={style}>
          {/*triggerd by Component when call props 'onSave' as function*/ }
          <MebelCreateForm onSave={this.handleSave} />
          <MebelList mebelList={mebels} viewer={this.props.viewer} />
        </Paper>
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
      mebels(first: $limit) {
        edges{
          node{
            id
          }
        }
        ${MebelList.getFragment('mebelList')}
      }
      ${MebelList.getFragment('viewer')}
      ${AddMebelMutation.getFragment('viewer')}
    }
    `
  }
});
