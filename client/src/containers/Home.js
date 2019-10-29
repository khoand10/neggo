import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container } from 'reactstrap';

import { someAction } from '../actions/';
import {getLoginStatus} from '../actions/login';

import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';

import Footer from './Footer';
import Header from './Header';

import navigation from '../config/navigations';
import routes from '../config/routes';

class Home extends Component {
  componentWillMount() {
    const userID = localStorage.getItem("userID");
    if (userID) {
      this.props.getLoginStatus(userID);
    }
    this.props.someAction();
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Header />
        </AppHeader>
        <div className="app-body">

          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                    <route.component {...props} />
                  )} />)
                    : (null);
                },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Footer />
        </AppFooter>
      </div>
    );
  }
}

function mapStateToProps({ somedata }) {
  return {
    somedata
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    someAction,
    getLoginStatus,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
