import Relay from 'react-relay'
class FileUploadMutation extends Relay.Mutation {
  getFiles() {
    return {
      file: this.props.img,
    };
  }
}
