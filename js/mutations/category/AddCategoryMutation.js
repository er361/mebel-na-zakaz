import Relay from 'react-relay';


export default class AddCategoryMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL `fragment on Viewer {
      id
      categorys {
        count
      }
    }`
  }

  getMutation(){
    return Relay.QL`mutation {addcategory}`;
  }

  getVariables(){
    return {
      name: this.props.name
    }
  }

  getFatQuery(){
    return Relay.QL `
      fragment on addcategoryPayload {
        changedcategoryEdge
        viewer {
          categorys {
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
        connectionName: 'categorys',
        edgeName: 'changedcategoryEdge',
        rangeBehaviors: {
          '': 'prepend'
        }
      }
    ]
  }

}
