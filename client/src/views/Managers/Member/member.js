import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Form, Label, Input, Button, Table, FormGroup, Pagination, PaginationItem, PaginationLink, Row, Col
} from 'reactstrap';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {deleteUser, getAllUser, updateUser} from '../../../actions/user';

class Member extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      role: '',
      password: '',
      error: false,
      activePage: 1,
      filter: {text: '', property: 'name'},
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeFilterProperty = this.handleChangeFilterProperty.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.userID != newProps.match.params.userID && newProps.match.params.userID !== "list") {
      const {users} = this.props;
      const user = users.find((user) => user.id == newProps.match.params.userID);
      this.setState({
        name: user.name,
        email: user.email,
        role: user.role.role,
        password: user.password,
      });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSearch(event) {
    const target = event.target;
    this.setState({filter: {...this.state.filter, text: target.value}, activePage: 1});
  }

  handleChangeFilterProperty(event) {
    const target = event.target;
    this.setState({filter: {...this.state.filter, property: target.value}, activePage: 1});
  }

  onFormSubmit = e => {
    e.preventDefault();
  }
 
  handleChangeSwitch = (id, checked) => {
    this.props.updateStatusActive(id, checked);
  }

  deleteUser = (userID) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this user.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const rs = await this.props.deleteUser(userID);
            if (rs.status === 200) {
              this.props.getAllUser();
            }
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  updateUser = async () => {
    const {userID} = this.props;
    const {name, email, role, password} = this.state;
    const newUser = {name, email, role, password, id : userID};
    try {
      const rs = await this.props.updateUser(newUser);
      if (rs.status === 200) {
        this.props.getAllUser();
        this.props.history.push('/members/list');
        this.setState({error: false});
      } else {
        this.setState({error: true});
      }
    } catch (error) {
      this.setState({error: true});
    }
  }

  detailUser = (userID) => {
    this.props.history.push(`/members/${userID}`);
  }

  previous = () => {
    const {activePage} = this.state;
    if (activePage > 1) {
      this.setState({activePage:this.state.activePage - 1})
    }
  }

  next = () => {
    const {users} = this.props;
    const {activePage} = this.state;
    if (activePage < Math.ceil(users.length/5)) {
      this.setState({activePage:this.state.activePage + 1})
    }
  }

  renderListUser() {
    const listUser = this.props.users;
    const {filter} = this.state;
    const users = listUser.filter((user) => user[filter.property].toLowerCase().includes(filter.text.toLowerCase()));
    const {activePage} = this.state;
    let pagination;
    let listIndex = [];
    for (let index = 1; index <= Math.ceil(users.length/5); index++) {
      listIndex.push(index);
    }
    if (users.length <= 5) {
        pagination = null;
    } else {
        pagination = (
          <Pagination aria-label="Page navigation example">
          <PaginationItem>
              <PaginationLink first onClick={() => this.setState({activePage:1})} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous onClick={() => this.previous()}/>
            </PaginationItem>
            {listIndex.map((item, index) => {
              return (
                <PaginationItem onClick={() => this.setState({activePage: item})}>
                <PaginationLink >
                  {item}
                </PaginationLink>
              </PaginationItem>
              )
            })}
            <PaginationItem>
              <PaginationLink next onClick={() => this.next()} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last onClick={() => this.setState({activePage:Math.ceil(users.length/5)})} />
            </PaginationItem>
          </Pagination>
        );
    }
    const listVisibleIntents = users.slice((activePage - 1) * 5, activePage * 5);
    if (listVisibleIntents.length === 0 && users.length !== 0) {
      this.setState({activePage: activePage - 1});
  }


    return (
      <div>
        {/* <Button
          color="primary"
          onClick={() => this.props.history.push(`/course/new-course`)}
        >New User</Button> */}
        <Row>
          <Col sm={8}>
            <Input onChange={this.handleSearch} type="text" name="search" id="search" placeholder="search" value={filter.text} />
          </Col>
          <Col sm={4}>
            <Input onChange={this.handleChangeFilterProperty} type="select" name="property" id="property" value={filter.property}>
              <option value='name'>{'Name'}</option>
              <option value='email'>{'Email'}</option>
            </Input>
          </Col>
        </Row>
        <Table hover bordered>
          <thead>
            <tr>
              {/* <th>Index</th> */}
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Remove</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {listVisibleIntents ? listVisibleIntents.map((item, index) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role.name}</td>
                  <th>
                    <Button
                      onClick={() => this.deleteUser(item.id)}
                    >remove</Button>
                  </th>
                  <th>
                    <Button
                      onClick={() => this.detailUser(item.id)}
                    >detail</Button>
                  </th>
                </tr>
              );
            }) : (null)}
          </tbody>
        </Table>
        {pagination}
      </div>
    );
  }

  renderDetailUser(userID) {
    const {name, email, role, password} = this.state;
    return (
      <Form onSubmit={this.onFormSubmit}>
        <FormGroup>
            <Label for="name">Name</Label>
            <Input onChange={this.handleChange} type="text" name="name" id="name" placeholder="name" value={name} />
        </FormGroup>
        <FormGroup>
            <Label for="name">Email</Label>
            <Input onChange={this.handleChange} type="text" name="email" id="email" placeholder="email" value={email} />
         </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Role</Label>
          <Input onChange={this.handleChange} type="select" name="role" id="role" value={role}>
            <option value='man'>{'Manager'}</option>
            <option value='mem'>{'Member'}</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="name">Password</Label>
          <Input onChange={this.handleChange} type="password" name="password" id="password" placeholder="password" value={password} />
        </FormGroup>

        <FormGroup>
            {this.state.error ?
                <div class="alert alert-danger" role="alert">
                Create fail!
              </div> : null
            }
            <Button color="secondary"
              onClick={() => this.props.history.push("/members/list")}
            >cancel</Button>{' '}
            <Button color="primary"
              onClick={() => this.updateUser()}
            >Save</Button>
        </FormGroup>
      </Form>
    );
  }

  render() {
    const {userID} = this.props;
    let content;
    if (userID === "list") {
      content = this.renderListUser();
    } else {
      content = this.renderDetailUser(userID);
    }
    return (
      <div class="container-fluid course-detail">
        {content}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const userID = ownProps.match.params.userID ? ownProps.match.params.userID : "";
  const {users} = state;
  return {
    users,
    userID,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteUser,
    getAllUser,
    updateUser,
  }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Member));
