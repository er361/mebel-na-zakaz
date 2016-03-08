import React, {Component} from 'react';
import Relay from 'react-relay';

import {List, Paper} from 'material-ui';


import Mebel from './Mebel';


class MebelList extends Component {
  render(){
    return(
      <div>
          <List subheader='Список мебели'>
            {this.props.mebelList.edges.map(edge =>
            <Mebel key={edge.node.id} mebel={edge.node} viewer= {this.props.viewer} />)}
          </List>
      </div>
    )
  }
}


export default Relay.createContainer(MebelList, {
  fragments: {
    viewer: () => Relay.QL `
    fragment on Viewer {
      ${Mebel.getFragment('viewer')}
    }`,
    mebelList: () => Relay.QL`
    fragment on mebelConnection {
      count
      edges{
        node{
          id
          ${Mebel.getFragment('mebel')}
        }
      }

    }`
  }
})
