import React, {Component} from 'react';
import Relay from 'react-relay';

import {List, ListItem, Paper} from 'material-ui';

import Mebel from './Mebel';



class MebelList extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
          <List
            subheader='Mebel list'>
            {this.props.mebels.edges.map(edge =>
            <Mebel key={edge.node.id} mebel={edge.node} viewer={this.props.viewer} />)}
          </List>
    )
  }
}


export default Relay.createContainer(MebelList, {
  fragments: {
    viewer: () => Relay.QL `
    fragment on Viewer {
      ${Mebel.getFragment('viewer')}
    }
    `,
    mebels: () => Relay.QL `
      fragment on mebelConnection{
        count
        edges{
          node{
            id
            ${Mebel.getFragment('mebel')}
          }
        }
      }
    `
  }
})
