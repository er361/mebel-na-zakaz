import React, {Component} from 'react';
import Relay from 'react-relay';

import {List, ListItem, Divider, IconButton} from 'material-ui';
import Clear from 'material-ui/lib/svg-icons/content/clear';

import DeleteMebelMutation from '../mutations/DeleteMebelMutation';

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
    var {name, id} = this.props.mebel;
    return(
      <section>
        <ListItem key={id}
          primaryText={name}
          rightIconButton={
            <IconButton onClick={this.handleDestroyClick}>
              <Clear />
            </IconButton>}>
        </ListItem>
        <Divider insert={true} />
      </section>
    )
  }
})

export default Relay.createContainer(Mebel, {
  fragments: {
    viewer: () => Relay.QL `
    fragment on Viewer {
      ${DeleteMebelMutation.getFragment('viewer')}
    }`,
    mebel: () => Relay.QL `
    fragment on mebel{
      id
      name
    } `
  }
})
