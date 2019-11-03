import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import {getLoginStatus} from './actions/login';
import {getAllCourses} from './actions/course';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const MemberLayout = React.lazy(() => import('./containers/MemberLayout'))

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {
  componentWillMount() {
    const userID = localStorage.getItem("userID");
    if (userID) {
      this.props.getLoginStatus(userID);
    }
  }

  componentDidMount() {
    this.props.getAllCourses();
  }

  render() {
    console.log('role ', this.props.role);
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              {this.props.role === 'mem' ? 
                <Route path="/" name="Home" render={props => <MemberLayout {...props}/>} /> :
                <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
              }
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

function mapStateToProps({ user }) {
  let role = '';
  if (user) {
    role = user.role.role ? user.role.role : '';
  }
  return {
    user,
    role,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getLoginStatus,
    getAllCourses,
  }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(App));
