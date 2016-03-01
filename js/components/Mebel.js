import React, {Component} from 'react';
import Relay from 'react-relay';

import {List, ListItem, Divider} from 'material-ui';
class Mebel extends Component {
  render(){
    var {name, id} = this.props.mebel;
    return(
      <section>
        <ListItem key={id}>{name}</ListItem>
        <Divider />
      </section>
    )
  }
}

export default Relay.createContainer(Mebel, {
  fragments: {
    mebel: () => Relay.QL `
    fragment on mebel{
      id
      name
    } `
  }
})
