import React from 'react';
import { Layout, Menu, BackTop } from 'antd';

import './index.less';

const { Header, Content, Footer } = Layout;

export default class BaseLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo">
            <h1>丹青策</h1>
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">教程</Menu.Item>
            <Menu.Item key="2">歌曲</Menu.Item>
            <Menu.Item key="3">商品</Menu.Item>
          </Menu>
        </Header>
        <Content>
          <div style={{ background: '#fff', padding: 24, minHeight: '100%', marginTop: 64 }}>
            Content
          </div>
          <BackTop />
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: '#fff' }}>
          丹青策 ©2018 Created by Fenpho
        </Footer>
      </Layout>
    );
  }
}
