import React from 'react';
import Relay from 'react-relay';
import {Grid, Cell} from 'react-mdl';

import CategoryCard from './CategoryCard.js';

var content =  React.createClass({
  showData(data){
    console.log(data);
  },
  handleClick(){
    console.log('click');
  },
  render(){
    var categories = this.props.viewer.categorys;

    return(
      <div className='container' >
        <Grid>
          {categories.edges.map(edge=>
            <Cell key={edge.node.id} col={4} shadow={5}>
              <CategoryCard  categoryCard={edge.node} />
            </Cell>
          )}
        </Grid>
      </div>
    )
  }
})

export default Relay.createContainer(content, {
  prepareVariables(){
    return {
      limit: 100
    }
  },
  fragments: {
    viewer: () => Relay.QL `
    fragment on Viewer {
      categorys( first: $limit){
        count
        edges{
          node{
            id
            ${CategoryCard.getFragment('categoryCard')}
          }
        }
      }
    }`
  }
})
