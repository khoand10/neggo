import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Switch from "react-switch";

import {Table, Button, Row, Col, Input, Form, FormGroup} from 'reactstrap';

import {updateStatusActive} from '../../../actions/course';
import {getAllQuestion} from '../../../actions/question';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      filter: {text: '', property: 'all'},
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeFilterProperty = this.handleChangeFilterProperty.bind(this);
  }

  handleSearch(event) {
    const target = event.target;
    this.setState({filter: {...this.state.filter, text: target.value}, activePage: 1});
  }

  handleChangeFilterProperty(event) {
    const target = event.target;
    this.setState({filter: {...this.state.filter, property: target.value}, activePage: 1});
  }

  componentWillMount() {
    if (!this.props.questions) {
      this.props.getAllQuestion();
    }
  }
 
  handleChangeSwitch = (id, checked) => {
    this.props.updateStatusActive(id, checked);
  }

  getTotalLession = (module) => {
    let totalLession = 0;
    for (let i = 0; i < module.length; i++) {
      const element = module[i];
      totalLession += element.lessions.length;      
    }
    return totalLession;
  }

  render() {
    const {course} = this.props;
    const {filter} = this.state;
    let courseDisplay;
    if (filter.property == "all") {
      courseDisplay = course.filter((item) => item.name.toLowerCase().includes(filter.text.toLowerCase()));
    } else {
      courseDisplay = course.filter((item) => item.active == (filter.property == "active") && item.name.toLowerCase().includes(filter.text.toLowerCase()));
    }
    return (
      <div>
        <FormGroup>
          <Button
            color="primary"
            onClick={() => this.props.history.push(`/course/new-course`)}
          >New Course</Button>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm={6}>
              <Input onChange={this.handleSearch} type="text" name="search" id="search" placeholder="search" value={filter.text} />
            </Col>
            <Col sm={3}>
              <Input onChange={this.handleChangeFilterProperty} type="select" name="property" id="property" value={filter.property}>
                <option value='all'>{'All'}</option>
                <option value='active'>{'Active'}</option>
                <option value='inActive'>{'InActive'}</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <Table hover bordered>
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Status</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {courseDisplay ? courseDisplay.map((item, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>
                    <Switch onChange={() =>this.handleChangeSwitch(item.id, !item.active)} checked={item.active} />
                  </td>
                  <td>
                    <Button
                      onClick={() => this.props.history.push(`/course/${item.id}`)}
                    >More</Button>
                  </td>
                </tr>
              );
            }) : (null)}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps({course, questions}) {
  return {
    course
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateStatusActive,
    getAllQuestion,
  }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Home));
