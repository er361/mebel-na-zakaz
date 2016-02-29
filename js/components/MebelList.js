import React, {Component} from 'react';
import Relay from 'react-relay';

import Mebel from './Mebel';

class MebelList extends Component {
  showData(data){
    console.log(data);
  }
  render(){
    return(
      <div>
        <ul>
          {this.props.mebelList.edges.map(edge =>
          <Mebel key={edge.node.id} mebel={edge.node} />)}
        </ul>
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
