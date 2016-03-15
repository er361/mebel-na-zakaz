import React, {Component} from 'react';
import Relay from 'react-relay';

import {TableRow,TableRowColumn} from 'material-ui';
//import DeleteMebelMutation from '../../mutations/mebel/DeleteMebelMutation';


const Mebel = React.createClass({
  // handleDestroyClick(){
  //   Relay.Store.commitUpdate(
  //     new DeleteMebelMutation({
  //       id: this.props.mebel.id,
  //       viewer: this.props.viewer
  //     })
  //   )
  // },

  render(){
    var {id,name} = this.props.category;
    return(
        <li >
          <span>{name}</span>
          <ul>
            {this.props.category.children.edges.map(edge =>
              <li key={edge.node.id}>{edge.node.name}</li>)}
          </ul>

        </li>
      )
  }
})

export default Relay.createContainer(Mebel, {
  prepareVariables(){
    return {
      limit : 100
    };
  },
  fragments: {
    viewer: () => Relay.QL `
    fragment on Viewer {
      id
      categorys{
        count
      }
    }`,
    category: () => Relay.QL `
    fragment on category{
      id
      name
      children(first: $limit){
        edges{
          node{
            id
            name
          }
        }
      }
    } `
  }
})
