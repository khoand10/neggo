import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Form, Row, Col, Label, Input, CustomInput, Button, Table, Collapse, CardBody, Card} from 'reactstrap';

import {createCourse} from '../../../actions/course';

class Module extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      courseInfo: '',
      logo: '',
      active: null,
      error: false,
      isOpen: false,
    }
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

  componentWillMount() {
      const {match, currentCourse} = this.props;
      if (match.params.courseID !== 'new-course') {
          this.setState({
            name: currentCourse.name,
            description: currentCourse.description,
            courseInfo: currentCourse.courseInfo,
            logo: currentCourse.logo,
            active: currentCourse.active,
          });
      }
  }

  createCourse = async () => {
    const {name, description, courseInfo, logo,} = this.state;
    const newCourse = {
      name,
      description,
      courseInfo,
      logo,
      active: true,
    }
    try {
      const rs = await this.props.createCourse(newCourse);
      if (rs.status === 200) {
        this.props.history.push(`/dashboard`)
      } else {
        this.setState({error: false});
      }
    } catch (error) {
      this.setState({error: false});
    }
  }

  toggle = () => {
    this.setState({isOpen :!this.state.isOpen});
  }

  render() {
    const {currentCourse} = this.props;
    return (
      <div class="container-fluid course-detail">
          <Form>
            <Row>
              <Col>
                <Label for="name">Name</Label>
                <Input onChange={this.handleChange} type="text" name="name" id="name" placeholder="course name" value={this.state.name} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label for="description">Description</Label>
                <Input onChange={this.handleChange} type="textarea" name="description" id="description" placeholder="course description" value={this.state.description} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label for="info">Info</Label>
                <Input onChange={this.handleChange} type="textarea" name="courseInfo" id="courseInfo" placeholder="course info" value={this.state.courseInfo} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label for="logo">Logo</Label>
                <Input onChange={this.handleChange} type="text" name="logo" id="logo" placeholder="course logo url" value={this.state.logo} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label for="status">Status</Label>
                <CustomInput onChange={this.handleChange} value={true} type="switch" id="exampleCustomSwitch" name="customSwitch"/>
              </Col>
            </Row>
            {currentCourse && currentCourse.modules && currentCourse.modules.length > 0 ?
              <Row>
                <Col>
                    <Button
                      color="primary"
                      onClick={() => this.toggle()}
                      style={{ marginBottom: '1rem' }}
                      size="lg"
                      block={true}
                      outline={true}
                    >{'Modules of course XXX'}</Button>
                    <Collapse isOpen={this.state.isOpen}>
                      <Card>
                        <CardBody>
                          <Button
                          color="info"
                          >
                            {'New Module'}
                          </Button>
                          <Table hover bordered size="sm">
                            <thead>
                              <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>Edit</th>
                                <th>Remove</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentCourse.modules ? currentCourse.modules.map((item, index) => {
                                return (
                                  <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <th>
                                      <Button
                                      >edit</Button>
                                    </th>
                                    <th>
                                      <Button
                                        >remove</Button>
                                    </th>
                                  </tr>
                                );
                              }) : (null)}
                            </tbody>
                          </Table> 
                        </CardBody>
                      </Card>
                    </Collapse>
                  </Col>
              </Row> : null
            }
            {this.state.error ?
                <div class="alert alert-danger" role="alert">
                Create course fail!
              </div> : null
            }
            <Button
              onClick={() => this.createCourse()}
              color="primary"
            >
              {'Save'}
            </Button>
          </Form>
      </div>
    );
  }
}

function mapStateToProps({course}, ownProps) {
    const {moduleID, courseID} = ownProps.match.params;
    const currentCourse = course.find((c) => c.id == courseID);
    return {
        currentCourse
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      createCourse,
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Module));
