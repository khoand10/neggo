import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {compare} from '../../utils/helper';

import {getLessionByModuleID} from '../../actions/lession';

class Module extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessions: [],
        }
    }

    async componentWillMount() {
        const rs = await this.props.getLessionByModuleID(this.props.moduleID);
        if (rs.status === 200) {
            this.setState({lessions: rs.data});
        }
    }
    render() {
        const {module, courseID} = this.props;
        return (
            <ListGroup>
                <ListGroupItem active tag="button" action>{module.name}</ListGroupItem>
                {this.state.lessions.map((lession, index) => {
                    console.log('test ', lession);
                    return (
                    <ListGroupItem
                        tag="button"
                        action
                        onClick={() => this.props.history.push(`/lession/${courseID}/${module.id}/${lession.id}`)}
                    >{lession.name}</ListGroupItem>
                    );
                })}
            </ListGroup>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const moduleID = ownProps.moduleID;
    return {
        moduleID,
        module: ownProps.module,
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getLessionByModuleID,
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(withRouter(Module)));
