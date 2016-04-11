import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Layout, Header, Navigation, Drawer } from 'react-mdl';
import style from '../style';

export default React.createClass({
  render(){
    const title = 'Mebel na zakaz';
    return (
        <div style={style.navbar}>
            <Layout style={{background: 'url(http://www.getmdl.io/assets/demos/transparent.jpg) center / cover'}}>
                <Header transparent  style={{color: 'white'}}  title={<Link to='/'>{title}</Link>}>
                    <Navigation>
                      <Link to='admin'>Adminka</Link>

                    </Navigation>
                </Header>
                <Drawer title="Title">
                    <Navigation>
                      <Link to='/admin'>Adminka</Link>
                    </Navigation>
                </Drawer>
            </Layout>
        </div>
    );
  }
})
