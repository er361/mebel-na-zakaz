import React, {Component} from 'react';
import Relay from 'react-relay';

class Mebel extends Component {
  render(){
    var {name, id} = this.props.mebel;
    return(
      <li key={id}>{name}</li>
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
