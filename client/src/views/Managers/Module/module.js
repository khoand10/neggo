import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Form, Row, Col, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import {getLessionByModuleID, createLession, updateLession, deleteLession} from '../../../actions/lession';

import Lession from '../Lession/lession';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {compare} from '../../../utils/helper';

class Module extends Component {

  constructor() {
    super();
    this.state = {
      lessions: [],
      name: '',
      modal: false,
      lessionEditing: {},
      lessionNameEditing: '',
      lessionSlotEditing: '',
      detailLession: null,
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

  async componentWillMount() {
    this.getAllLessionByModuleID();
  }

  getAllLessionByModuleID = async () => {
    const {module} = this.props;
      const rs = await this.props.getLessionByModuleID(module.id);
      if (rs.status === 200) {
        this.setState({lessions: rs.data});
      }
  }

  createLession = async () => {
    const slot = this.state.lessions ? this.state.lessions.length + 1 : 1;
    const newLession = {
      name: this.state.name,
      moduleID: this.props.module.id,
      slot,
    }
    try {
      const rs = await this.props.createLession(newLession);
      if (rs.status === 200) {
        this.getAllLessionByModuleID();
        this.setState({name: ''});
      } else {
      }
    } catch (error) {
    }
  }

  deleteLession = (lessionID) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this lession.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const rs = await this.props.deleteLession(lessionID);
            if (rs.status === 200) {
              this.getAllLessionByModuleID();
            }
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
      lessionEditing: {},
      lessionNameEditing: '',
      lessionSlotEditing: '',
    });
  }

  openModalUpdate = (item) => {
    this.setState({
      modal: true,
      lessionEditing: item,
      lessionNameEditing: item.name,
      lessionSlotEditing: item.slot,
    });
  }

  updateLession = async () => {
    const newLession = {
      id: this.state.lessionEditing.id,
      name: this.state.lessionNameEditing,
      moduleID: this.props.module.id,
      slot: this.state.lessionSlotEditing,
    }
    try {
      const rs = await this.props.updateLession(newLession);
      if (rs.status === 200) {
        this.getAllLessionByModuleID();
        this.setState({
          modal: false,
          lessionEditing: {},
          lessionNameEditing: '',
          lessionSlotEditing: '',
        });
      } else {
      }
    } catch (error) {
    }
  }

  formPreventDefault(e) {
    e.preventDefault();
  }

  renderLession() {
    const {lessions} = this.state;
    if (lessions.length > 0) {
      lessions.sort(compare);
    }
    return (
      <React.Fragment>
        <h2>{this.props.module.name}</h2>
        <Form onSubmit={this.formPreventDefault}>
          <Row>
            <Col>
              <Label for="name">Name</Label>
              <Input onChange={this.handleChange} type="text" name="name" id="name" placeholder="lession name" value={this.state.name} />
            </Col>
          </Row>
          <Row>
            <Button
              color="info"
              onClick={() => this.createLession()}
            >
              {'New Lession'}
            </Button>
          </Row>
          {lessions.length > 0 ?
            <Row>
              <Col>
                <Modal isOpen={this.state.modal} toggle={() => this.toggleModalUpdate()}>
                  <ModalHeader toggle={() => this.toggleModalUpdate()}>Update lession</ModalHeader>
                  <ModalBody>
                      <Label for="md-module-name">Name</Label>
                      <Input type="textarea" placeholder="lession name" name="lessionNameEditing" onChange={this.handleChange} rows={1} value={this.state.lessionNameEditing} />
                      <Label for="md-module-slot">Slot</Label>
                      <Input type="textarea" placeholder="lession slot" name="lessionSlotEditing" onChange={this.handleChange} rows={1} value={this.state.lessionSlotEditing} />
                  </ModalBody>
                  <ModalFooter>
                      <Button color="primary" onClick={() => this.updateLession()}>Update</Button>{' '}
                      <Button color="secondary" onClick={() => this.closeModal()}>Cancel</Button>
                  </ModalFooter>
                </Modal>
                <Table hover bordered size="sm">
                  <thead>
                    <tr>
                      <th>Slot</th>
                      <th>Name</th>
                      <th>Edit</th>
                      <th>Remove</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lessions.map((item, index) => {
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
                              onClick={() => this.deleteLession(item.id)}
                            >remove</Button>
                          </th>
                          <th>
                            <Button
                              onClick={() => this.setState({detailLession: item})}
                            >detail</Button>
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table> 
              </Col>
            </Row> : null
          }
          {this.state.error ?
              <div class="alert alert-danger" role="alert">
              Create course fail!
            </div> : null
          }
          <Row>
            <Button
              onClick={() => this.props.back()}
              color="warning"
            >
              {'Back'}
            </Button>
          </Row>
        </Form>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        {!this.state.detailLession ? this.renderLession() : <Lession back={() => this.setState({detailLession: null})} lession={this.state.detailLession}/>}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return {
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      getLessionByModuleID,
      createLession,
      updateLession,
      deleteLession,
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Module));
