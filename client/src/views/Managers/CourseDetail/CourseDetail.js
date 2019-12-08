import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Form, Row, Col, Label, Input, CustomInput, Button, Table, Collapse, CardBody, Card,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {createCourse, createModule, deleteModule, updateModule} from '../../../actions/course';

import {compare} from '../../../utils/helper';

import Module from '../Module/module';

class CourseDetail extends Component {

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
      newModuleName: '',
      moduleEditing: {},
      moduleNameEditing: '',
      moduleSlotEditing: '',
      detailModule: null,
      modal: false,
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

  createModule = async () => {
    const slot = this.props.currentCourse.modules ? this.props.currentCourse.modules.length + 1 : 1;
    const newModule = {
      name: this.state.newModuleName,
      courseID: this.props.currentCourse.id,
      slot,
    }
    try {
      const rs = await this.props.createModule(newModule);
      if (rs.status === 200) {
        this.setState({newModuleName: ''});
      } else {
      }
    } catch (error) {
    }
  }

  deleteModule = (moduleID) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this module.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.props.deleteModule(moduleID, this.props.currentCourse.id)
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  toggleModalUpdate = () => {
    this.setState({modal: !this.state.modal});
  }

  closeModal = () => {
    this.setState({
      modal: false,
      moduleEditing: {},
      moduleNameEditing: '',
      moduleSlotEditing: '',
    });
  }

  openModalUpdate = (item) => {
    this.setState({
      modal: true,
      moduleEditing: item,
      moduleNameEditing: item.name,
      moduleSlotEditing: item.slot,
    });
  }

  updateModule = async () => {
    const newModule = {
      id: this.state.moduleEditing.id,
      name: this.state.moduleNameEditing,
      courseID: this.props.currentCourse.id,
      slot: this.state.moduleSlotEditing,
    }
    try {
      const rs = await this.props.updateModule(newModule);
      if (rs.status === 200) {
        this.setState({
          modal: false,
          moduleEditing: {},
          moduleNameEditing: '',
          moduleSlotEditing: '',
        });
      } else {
      }
    } catch (error) {
    }
  }

  renderModule() {
    const {currentCourse} = this.props;
    if (currentCourse && currentCourse.modules) {
      currentCourse.modules.sort(compare);
    }
    return (
      <React.Fragment>
        <h2>{currentCourse.name}</h2>
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
          <Modal isOpen={this.state.modal} toggle={() => this.toggleModalUpdate()}>
            <ModalHeader toggle={() => this.toggleModalUpdate()}>Update module</ModalHeader>
            <ModalBody>
                <Label for="md-module-name">Name</Label>
                <Input type="textarea" placeholder="module name" name="moduleNameEditing" onChange={this.handleChange} rows={1} value={this.state.moduleNameEditing} />
                <Label for="md-module-slot">Slot</Label>
                <Input type="textarea" placeholder="module slot" name="moduleSlotEditing" onChange={this.handleChange} rows={1} value={this.state.moduleSlotEditing} />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => this.updateModule()}>Update</Button>{' '}
                <Button color="secondary" onClick={() => this.closeModal()}>Cancel</Button>
            </ModalFooter>
          </Modal>
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
                  >{'Modules of course'}</Button>
                  <Collapse isOpen={this.state.isOpen}>
                    <Card>
                      <CardBody>
                        <Button
                          color="info"
                          onClick={() => this.createModule()}
                        >
                          {'New Module'}
                        </Button>
                        <Input onChange={this.handleChange} type="text" name="newModuleName" id="modulename" placeholder="module name" value={this.state.newModuleName} />
                        <Table hover bordered size="sm">
                          <thead>
                            <tr>
                              <th>Order</th>
                              <th>Name</th>
                              <th>Edit</th>
                              <th>Remove</th>
                              <th>Detail</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentCourse.modules ? currentCourse.modules.map((item, index) => {
                              return (
                                <tr>
                                  <th scope="row">{item.slot}</th>
                                  <td>{item.name}</td>
                                  <th>
                                    <Button
                                      onClick={() => this.openModalUpdate(item)}
                                    >edit</Button>
                                  </th>
                                  <th>
                                    <Button
                                      onClick={() => this.deleteModule(item.id)}
                                    >remove</Button>
                                  </th>
                                  <th>
                                    <Button
                                      onClick={() => this.setState({detailModule: item})}
                                    >Detail</Button>
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
      </React.Fragment>
    );
  }

  render() {
    const {currentCourse} = this.props;
    if (currentCourse && currentCourse.modules) {
      currentCourse.modules.sort(compare);
    }
    return (
      <div class="container-fluid course-detail">
        {!this.state.detailModule ? this.renderModule() : <Module module={this.state.detailModule} back={() => this.setState({detailModule: null})} />}
      </div>
    );
  }
}

function mapStateToProps({course}, ownProps) {
    const courseID = ownProps.match.params.courseID;
    const currentCourse = course.find((c) => c.id == courseID);
    return {
        currentCourse
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      createCourse,
      createModule,
      deleteModule,
      updateModule,
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(CourseDetail));
