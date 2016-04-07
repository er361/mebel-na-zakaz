import FileReaderInput from 'react-file-reader-input';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {RaisedButton} from 'material-ui'
import expect from 'expect';

describe('file reader', () => {
  it('should show component', () => {
    const fileReader = TestUtils.renderIntoDocument(
      <FileReaderInput value='ok'>

      </FileReaderInput>
    );
    const fileReaderDom = ReactDOM.findDOMNode(fileReader);

    //expect(1).toBe(1);
    //expect(fileReaderDom.test).toBe('ok');
    console.log(fileReaderDom);
  })
})
