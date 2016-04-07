import Relay from 'react-relay';


export default class AddMebelMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL `fragment on Viewer {
      id
      mebels {
        count
      }
    }`
  }

  getMutation(){
    return Relay.QL`mutation {addmebel}`;
  }

  getVariables(){
    return {
      categoryId: this.props.categoryId,
      name: this.props.name,
      image: this.props.image
    }
  }

  getFatQuery(){
    return Relay.QL `
      fragment on addmebelPayload {
        changedmebelEdge
        viewer {
          mebels {
            count
          }
        }
      }`
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'viewer',
        parentID: this.props.viewer.id,
        connectionName: 'mebels',
        edgeName: 'changedmebelEdge',
        rangeBehaviors: {
          '': 'prepend'
        }
      }
    ]
  }

}
