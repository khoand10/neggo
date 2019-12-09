import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, Badge, ButtonGroup, Button, Nav, NavLink, NavItem, TabContent} from 'reactstrap';
import {compare} from '../../utils/helper';
import Quiz from '../Quiz/quiz';

import {getPartByLessionID} from'../../actions/part';
import {getLessionByID} from '../../actions/lession';
import classnames from 'classnames';

const Markdown = require('react-markdown');

class Lession extends Component {

  constructor(props) {
      super(props);
      this.state = {
          currentIndexPart: 0,
          currentPart: [],
          currentLession: {},
      }
  }

  async componentDidMount() {
    const {lessionID} = this.props;
    this.props.getPartByLessionID(lessionID).then(
        (rs) => {
            this.setState({currentPart: rs.data});
        }
    );
    const rs = await this.props.getLessionByID(lessionID);
    if (rs.status === 200) {
        this.setState({currentLession: rs.data});
    }
  }

  renderDocContent(currentPart) {
    return (
        <React.Fragment>
            <h5>{currentPart ? currentPart.name : ''}</h5>
            <Markdown source={currentPart ? currentPart.content : ''} />
        </React.Fragment>
    )
  }

  renderQuizContent(currentPart) {
    return (
        <Quiz question={currentPart.questions[0] ? currentPart.questions[0] : null}/>
    );
  }

  toggle = tab => {
      const {currentIndexPart} = this.state;
    if(currentIndexPart !== tab) {
        this.setState({currentIndexPart: tab});
    }
  }

  render() {
    const {currentModule} = this.props;
    const {currentIndexPart, currentPart, currentLession} = this.state;
    const parts = currentPart.sort(compare);
    const currentFirstPart = parts[currentIndexPart];
    if (!currentFirstPart) {
        return null;
    }
    
    return (
        <div class="container-fluid">
            <Row>
                <Col
                    md={7}
                    className='course-info'
                >
                    <h4>{currentModule.name}</h4>
                    <Badge color="secondary">{currentLession.name ? currentLession.name : ''}</Badge>
                </Col>
            </Row>
            <Row>
                <Col
                    md={7}
                    className='course-info'
                >
                    <Nav tabs>
                        {parts.map((item, index) => {
                            if (item.type === true) {
                                return (
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: currentIndexPart === index})}
                                            onClick={() => this.toggle(index)}
                                        >
                                        Quiz</NavLink>
                                    </NavItem>
                                );
                            } else {
                                return (
                                    <NavItem>
                                        <NavLink
                                        className={classnames({ active: currentIndexPart === index})}
                                        onClick={() => this.toggle(index)}
                                    >Theory</NavLink>
                                    </NavItem>
                                );
                            }
                        })}
                    </Nav>
                    <TabContent activeTab={currentIndexPart}>
                        {currentFirstPart.type !== true ? this.renderDocContent(currentFirstPart) : this.renderQuizContent(currentFirstPart)}
                    </TabContent>
                </Col>
            </Row>
        </div>
    );
  }
}

function mapStateToProps({courseActives}, ownProps) {
    const {courseID, moduleID, lessionID} = ownProps.match.params;
    const currentCourse = courseActives.find((c) => c.id == courseID);
    const currentModule = currentCourse.modules.find((m) => m.id == moduleID);
    // const currentLession = currentModule.lessions.find((l) => l.id == lessionID);

    return {
        currentModule,
        // currentLession,
        lessionID,
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPartByLessionID,
        getLessionByID,
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Lession));
