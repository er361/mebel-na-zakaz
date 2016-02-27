import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  showData(obj){
    console.log(obj);
  }
  render() {

    return (
      <div>
        <h1>Mebel list</h1>
        {this.props.viewer.mebels.edges.map(edge =>
          <li key={edge.node.id}>{edge.node.name}</li>
        )}
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  prepareVariables(){
    return {
      limit: 100
    }
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        mebels(first: $limit){
          edges{
            node{
              id
              name
            }
          }
        }
      }
    `,
  },
});
