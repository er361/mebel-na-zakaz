import React, {Component} from 'react';
import Relay from 'react-relay';

import {ListItem, IconButton} from 'material-ui';
import Clear from 'material-ui/lib/svg-icons/content/clear';

import DeleteCategoryMutation from '../../../mutations/category/DeleteCategoryMutation';

const Category = React.createClass({
  handleDestroyClick(){
    //console.log(this.props.category.id);
    Relay.Store.commitUpdate(
      new DeleteCategoryMutation({
        id: this.props.category.id,
        viewer: this.props.viewer
      })
    )
  },
  render(){
    var {id,name, image} = this.props.category;
    return(
        <ListItem
          key={id}
          leftIcon={<img src={`images/${image}`} />}
          rightIconButton={<IconButton onClick={this.handleDestroyClick} touch={true}><Clear /></IconButton>}
          primaryText={name} />
    )
  }
})

export default Relay.createContainer(Category, {
  fragments: {
    viewer: () => Relay.QL `
    fragment on Viewer{
      ${DeleteCategoryMutation.getFragment('viewer')}
    }`,
    category: () => Relay.QL `
    fragment on category {
      id
      name
      image
    }`
  }
})
