import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';

import LoginForm from './forms/LoginForm';
import { login } from '../actions/login';
import { Redirect } from "react-router";

class Login extends Component {

  render() {
    const { login, user} = this.props;
    return (<div>
      {user ? <Redirect to="/" /> :
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <LoginForm onSubmit={login} />
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Learn to code for FREE!</h2>
                      <p>React Boilerplate with Redux, with CoreUI for UI with SCSS. Most commonly used utility libraries like Moment and Lodash are included. Axios is used to access REST APIs and Thunk Used as the Middleware.</p>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
      }
    </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login
  }, dispatch);
}


export default (connect(mapStateToProps, mapDispatchToProps)(Login));