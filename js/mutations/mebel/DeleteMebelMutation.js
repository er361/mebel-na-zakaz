import Relay from 'react-relay';

export default class DeleteMebelMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL `fragment on Viewer {
      id
      mebels {
        count
      }
    }`
  }

  getMutation(){
    return Relay.QL `mutation{deletemebel}`
  }

  getVariables(){
    return {
      id: this.props.id
    }
  }

  getFatQuery(){
    return Relay.QL `
      fragment on deletemebelPayload {
        id
        viewer {
          id
          mebels {
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
      connectionName: 'mebels',
      deletedIDFieldName: 'id'
    }];
  }
}
