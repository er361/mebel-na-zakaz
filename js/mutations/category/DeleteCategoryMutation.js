import Relay from 'react-relay';

export default class DeleteCategoryMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL `fragment on Viewer {
      id
      categorys {
        count
      }
    }`
  }

  getMutation(){
    return Relay.QL `mutation{deletecategory}`
  }

  getVariables(){
    return {
      id: this.props.id
    }
  }

  getFatQuery(){
    return Relay.QL `
      fragment on deletecategoryPayload {
        id
        viewer {
          id
          categorys{
            count
          }
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'categorys',
      deletedIDFieldName: 'id'
    }];
  }
}
