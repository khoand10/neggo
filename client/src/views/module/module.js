import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import _ from 'lodash';
import {compare} from '../../utils/helper';

import {getLessionByModuleID} from '../../actions/lession';
import {updateHistory} from '../../actions/history';

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

    takeLession = (courseID, moduleID, lessionID) => {
        const {histories, user} = this.props;
        const newHistory = {...histories};
        if (_.isEmpty(newHistory[courseID]) || !newHistory[courseID][moduleID]) {
            newHistory[courseID] = {
                [moduleID]: {
                    [lessionID]: {}
                }
            }
        } else {
            newHistory[courseID][moduleID] = {...newHistory[courseID][moduleID],
                [lessionID]: {}
            }
        }
        const newData = {
            userID: user.id,
            history: JSON.stringify(newHistory),
          }
          console.log('new his ', newHistory);
          this.props.updateHistory(newData);
        this.props.history.push(`/lession/${courseID}/${moduleID}/${lessionID}`);
    }

    render() {
        const {module, courseID, histories} = this.props;
        // console.log('his ', histories);
        return (
            <ListGroup>
                <ListGroupItem active tag="button" action>{module.name}</ListGroupItem>
                {this.state.lessions.map((lession, index) => {
                    let nextAble = false;
                    if (index !== 0) {
                        try {
                            const preLession = this.state.lessions[index - 1]
                            console.log('pre ', preLession, histories, module.id);
                            nextAble = histories[courseID][module.id][preLession.id].status !== "done"
                        } catch (error) {
                            nextAble = true;
                        }
                    }
                    return (
                    <ListGroupItem
                        disabled={nextAble}
                        tag="button"
                        action
                        onClick={() => this.takeLession(courseID, module.id, lession.id)}
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
        histories: state.histories,
        user: state.user,
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getLessionByModuleID,
        updateHistory,
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(withRouter(Module)));
