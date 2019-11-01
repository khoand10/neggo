import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  Button, 
  Card, CardBody, 
  CardFooter, 
  Col, Container, 
  Form, 
  Input, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Row,
  FormFeedback,
} from 'reactstrap';

import {createUser} from '../../../actions/user';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      repassword: '',
      submitting: false,
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  createNewUser = async () => {
    this.setState({submitting: true}, async () => {
      const {fullname, email, password} = this.state;
      const newUser = {
        name: fullname,
        email: email,
        password: password,
        role: 'mem'
      }
      try {
        const rs = await this.props.createUser(newUser);
        if (rs.status === 200) {
          this.props.history.push('/login');
        } else {
          this.setState({error: true});
        }
      } catch (error) {
        this.setState({error: true});
      }
    });
  }

  render() {
    const {error, submitting} = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                        type="text" 
                        placeholder="Full Name" 
                        autoComplete="fullname"
                        name='fullname'
                        value={this.state.fullname}
                      onChange={this.handleChange}
                      />
                      <FormFeedback valid={'has-danger'}>Sweet! that name is available</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input 
                        type="text" 
                        placeholder="Email" 
                        autoComplete="email" 
                        name="email"
                        value={this.state.email}
                      onChange={this.handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                        type="password" 
                        placeholder="Password" 
                        autoComplete="new-password" 
                        name="password"
                        value={this.state.password}
                      onChange={this.handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                      type="password" 
                      placeholder="Repeat password" 
                      autoComplete="new-password" 
                      name="repassword"
                      value={this.state.repassword}
                      onChange={this.handleChange}
                      />
                    </InputGroup>
                    <Button
                      color="success"
                      block
                      onClick={() => this.createNewUser()}
                      disabled={submitting}
                    >Create Account</Button>
                  </Form>
                </CardBody>
                {error ?
                    <div class="alert alert-danger" role="alert">
                    Create fail!
                  </div> : null
                }
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({}) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createUser,
  }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Register));
