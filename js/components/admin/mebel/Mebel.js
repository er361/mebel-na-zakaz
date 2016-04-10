import React, {Component} from 'react';
import Relay from 'react-relay';

import  {ListItem, IconButton} from 'material-ui';
import Clear from 'material-ui/lib/svg-icons/content/clear';
import DeleteMebelMutation from '../../../mutations/mebel/DeleteMebelMutation';


const Mebel = React.createClass({
  handleDestroyClick(){
    Relay.Store.commitUpdate(
      new DeleteMebelMutation({
        id: this.props.mebel.id,
        viewer: this.props.viewer
      })
    )
  },

  render(){
    var {id,name, image} = this.props.mebel;
    return(
      <ListItem
        key={id}
        leftIcon={<img src={`/images/${image}`} />}
        rightIconButton={<IconButton onClick={this.handleDestroyClick} touch={true}><Clear /></IconButton>}
        primaryText={name} />
      )
  }
})

export default Relay.createContainer(Mebel, {
  fragments: {
    viewer: () => Relay.QL `
    fragment on Viewer {
      ${DeleteMebelMutation.getFragment('viewer')}
    }
    `,
    mebel: () => Relay.QL `
      fragment on mebel {
        id
        name
        image
      }
    `
  }
})
