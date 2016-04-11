import React from 'react';
import Relay from 'react-relay';
import {Card, CardMedia, CardTitle, Cell} from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';

var CategoryCard = React.createClass({
  render(){
    var {name,image} = this.props.categoryCard;
    return (
        <Card >
          <CardMedia  overlay={<CardTitle title={name} />}
          >
            <img  src={`images/${image}`} />
          </CardMedia>
        </Card>
    )
  }
})

export default Relay.createContainer(CategoryCard, {
  fragments: {
    categoryCard: () => Relay.QL `
    fragment on category {
      id
      name
      image
    }
    `
  }
})
