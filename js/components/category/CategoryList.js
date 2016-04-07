import React, {Component} from 'react';
import Relay from 'react-relay';

import  {Paper, List, ListItem} from  'material-ui';

import Category from './Category';

class CategoryList extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <List
          subheader='Category list'>
          {this.props.categories.edges.map(edge =>
            <Category key={edge.node.id} category={edge.node} viewer={this.props.viewer} />)}
        </List>
    )
  }
}

export default Relay.createContainer(CategoryList, {
  fragments:{
    viewer: () => Relay.QL `
    fragment on Viewer{
      ${Category.getFragment('viewer')}
    }`,
    categories: () => Relay.QL `
      fragment on categoryConnection{
        count
        edges{
          node{
            id
            ${Category.getFragment('category')}
          }
        }
      }
    `
  }
})
