import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(({ showSideDrawer }) => {
      return { showSideDrawer: !showSideDrawer };
    });
  };

  render() {
    const { showSideDrawer } = this.state;
    const { children, isAuthenticated } = this.props;

    return (
      <>
        <Toolbar
          isAuthenticated={isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuthenticated={isAuthenticated}
          open={showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{children}</main>
      </>
    );
  }
}

const mapStateToProps = ({ auth: { token } }) => {
  return {
    isAuthenticated: Boolean(token),
  };
};

export default connect(mapStateToProps)(Layout);
