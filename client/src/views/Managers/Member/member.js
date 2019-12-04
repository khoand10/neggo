import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Switch from "react-switch";

import {Table, Button} from 'reactstrap';

class Member extends Component {
  constructor() {
    super();
    // this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
  }
 
  handleChangeSwitch = (id, checked) => {
    this.props.updateStatusActive(id, checked);
  }

  render() {
    const {users} = this.props;
    return (
      <div>
        <Button
          color="primary"
          onClick={() => this.props.history.push(`/course/new-course`)}
        >New User</Button>
        <br/>
        ----
        <br/>
        <Table hover bordered>
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users ? users.map((item, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role.name}</td>
                </tr>
              );
            }) : (null)}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps({users}) {
  return {
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Member));
