import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Switch from "react-switch";

import {Table, Button} from 'reactstrap';

import {updateStatusActive} from '../../../actions/course';

class Home extends Component {
  constructor() {
    super();
    // this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
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
    return (
      <div>
        <Button
          color="primary"
          onClick={() => this.props.history.push(`/course/new-course`)}
        >New Course</Button>
        <br/>
        ----
        <br/>
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
            {course ? course.map((item, index) => {
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

function mapStateToProps({course}) {
  return {
    course
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateStatusActive,
  }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Home));
