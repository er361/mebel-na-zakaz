import React from 'react';
import Relay from 'react-relay';

import MebelList from './MebelList';
import Mebel from './Mebel';

class App extends React.Component {
  render(){
    const mebels = this.props.viewer.mebels;
    return(
      <div>
        <MebelList mebelList={mebels} />
      </div>
    )
  }
}

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
    }
    `
  }
});
