import React from 'react';
import Navbar from './Navbar';

export default React.createClass({
  render(){
    return(
      <div>
        <Navbar />
        <div className='containter'>
          {this.props.children}
        </div>
      </div>

    )
  }
})
