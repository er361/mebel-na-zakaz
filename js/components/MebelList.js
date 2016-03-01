import React, {Component} from 'react';
import Relay from 'react-relay';

import {List, Paper} from 'material-ui';


import Mebel from './Mebel';


class MebelList extends Component {
  showData(data){
    console.log(data);
  }
  render(){

    return(
      <div>
          <List subheader='Список мебели'>
            {this.props.mebelList.edges.map(edge =>
            <Mebel key={edge.node.id} mebel={edge.node} />)}
          </List>
      </div>
    )
  }
}


export default Relay.createContainer(MebelList, {
  fragments: {
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
