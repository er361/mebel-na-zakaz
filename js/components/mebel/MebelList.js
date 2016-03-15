import React, {Component} from 'react';
import Relay from 'react-relay';

import Mebel from './Mebel';


class MebelList extends Component {
  render(){
    return(
      <div className='col-md-6 col-md-offset-3' >
              { this.props.categoryList.edges.map(edge =>
                    <Mebel key={edge.node.id} category={edge.node} viewer={this.props.viewer} />
              )}
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
    categoryList: () => Relay.QL`
    fragment on categoryConnection {
      count
      edges{
        node{
          id
          ${Mebel.getFragment('category')}
        }
      }
    }`
  }
})
