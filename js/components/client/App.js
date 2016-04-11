import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import style from '../style';

export default React.createClass({
  render(){

    return(
      <div>
        <Navbar/>
        <div  style={style.root}  className='containter'>
          {this.props.children}
        </div>
        <Footer />
      </div>

    )
  }
})
