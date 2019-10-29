import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { logout } from '../../actions/login';


class UserMenu extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    login = () => {
        window.location.href = "http://localhost:4000/login"
    }

    logout = () => {
        localStorage.removeItem("userID");
        window.location.href = "http://localhost:4000/"
    }

    render() {
        const {user} = this.props;
        return (
            <div>
                {
                    user ? 
                        <div>
                            <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle nav>
                                    <img src={'assets/img/avatars/8.jpg'} className="img-avatar"/>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-lg" right>
                                    <DropdownItem><i className="fa fa-user"></i>Edit Profile</DropdownItem>
                                    <DropdownItem><i className="fa fa-key"></i> <a href="/">Change Password</a></DropdownItem>
                                    <DropdownItem onClick={() => this.logout()}><i className="fa fa-sign-out"></i> Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div> : 
                        <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle nav>
                            <span className="text-avatar bg-info">G</span>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-lg" right>
                                <DropdownItem onClick={() => this.login()}><i className="fa fa-sign-out"></i> Login</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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
        logout
    }, dispatch);
}


export default (connect(mapStateToProps, mapDispatchToProps)(UserMenu));
