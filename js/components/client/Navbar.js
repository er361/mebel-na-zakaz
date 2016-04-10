import React from 'react';
import { Link } from 'react-router';
import { Layout, Header, Navigation, Drawer } from 'react-mdl';

export default React.createClass({
  render(){
    const title = 'Mebel na zakaz';
    return (
        <div style={{height: '300px', position: 'relative'}}>
            <Layout style={{background: 'url(http://www.getmdl.io/assets/demos/transparent.jpg) center / cover'}}>
                <Header transparent  style={{color: 'white'}}  title={<Link to='/'>{title}</Link>}>
                    <Navigation>
                      <Link to='/admin'>Adminka</Link>
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
