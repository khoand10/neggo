import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, Badge, ButtonGroup, Button, Nav, NavLink, NavItem, TabContent} from 'reactstrap';
import _ from 'lodash';
import {compare} from '../../utils/helper';
import Quiz from '../Quiz/quiz';

import {getPartByLessionID} from'../../actions/part';
import {updateHistory} from '../../actions/history';
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
    const {user, histories, courseID, currentModule, lessionID} = this.props;
    this.props.getPartByLessionID(lessionID).then(
        (rs) => {
            this.setState({currentPart: rs.data}, () => { 
                if (rs.data.length > 0) {
                    const newHistory = {...histories};
                    const hisModule = histories[courseID][currentModule.id][lessionID];
                    if (_.isEmpty(hisModule)) {
                        newHistory[courseID][currentModule.id][lessionID] = {
                            passSlot: 1
                        };
                    }
                    const newData = {
                        userID: user.id,
                        history: JSON.stringify(newHistory),
                    }
                    this.props.updateHistory(newData);
                }
            });

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
            {/* <Markdown source={currentPart ? currentPart.content : ''} /> */}
            <EditorPreview data={currentPart ? currentPart.content : ''} />
        </React.Fragment>
    )
  }

  renderQuizContent(currentPart) {
    return (
        <Quiz item={currentPart} question={currentPart.questions[0] ? currentPart.questions[0] : null} passQuiz={this.passQuiz}/>
    );
  }

  passQuiz = (item) => {
    const {user, histories, courseID, currentModule, lessionID} = this.props;
    const {currentPart} = this.state;
    const newHistory = {...histories};
    const passSlot = histories[courseID][currentModule.id][lessionID]['passSlot'];
    if (passSlot < item.slot) {
        newHistory[courseID][currentModule.id][lessionID] = {
            passSlot: item.slot,
            status: item.slot === currentPart.length ? "done" : "",
        }
    const newData = {
        userID: user.id,
        history: JSON.stringify(newHistory),
        }
        this.props.updateHistory(newData);
    }
  }

  toggle = (tab, item) => {
      const {currentIndexPart, currentPart} = this.state;
      if(currentIndexPart !== tab) {
          this.setState({currentIndexPart: tab});
          if (item.type !== true) {
              const {user, histories, courseID, currentModule, lessionID} = this.props;
              const newHistory = {...histories};
              const passSlot = histories[courseID][currentModule.id][lessionID]['passSlot'];
              if (passSlot < item.slot) {
                newHistory[courseID][currentModule.id][lessionID] = {
                    passSlot: item.slot,
                    status: item.slot === currentPart.length ? "done" : "",
                }
                const newData = {
                    userID: user.id,
                    history: JSON.stringify(newHistory),
                  }
                  this.props.updateHistory(newData);
              }
          }
    }
  }

  nextPart = () => {
      const {currentPart, currentIndexPart} = this.state;
      if (currentIndexPart < currentPart.length - 1) {
        this.setState({currentIndexPart: currentIndexPart+1});
      }
  }

  backPart = () => {
    const {currentIndexPart} = this.state;
    if (currentIndexPart > 0) {
      this.setState({currentIndexPart: currentIndexPart-1});
    }
  }

  backToListLession = () => {
    const {courseID} = this.props.match.params;
    this.props.history.push(`/course/${courseID}`);
  }

  render() {
    const {currentModule, histories, courseID, lessionID} = this.props;
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
                            let nextAble = false;
                            if (index !== 0) {
                                try {
                                    nextAble = item.slot > histories[courseID][currentModule.id][lessionID]['passSlot'] + 1;
                                } catch (error) {
                                    console.log('error');
                                    nextAble = true;
                                }
                            }
                            if (item.type === true) {
                                return (
                                    <NavItem>
                                        <NavLink
                                            disabled={nextAble}
                                            className={classnames({ active: currentIndexPart === index})}
                                            onClick={() => this.toggle(index, item)}
                                        >
                                        Quiz</NavLink>
                                    </NavItem>
                                );
                            } else {
                                return (
                                    <NavItem>
                                        <NavLink
                                        disabled={nextAble}
                                        className={classnames({ active: currentIndexPart === index})}
                                        onClick={() => this.toggle(index, item)}
                                    >Theory</NavLink>
                                    </NavItem>
                                );
                            }
                        })}
                    </Nav>
                    <TabContent activeTab={currentIndexPart}>
                        {currentFirstPart.type !== true ? this.renderDocContent(currentFirstPart) : this.renderQuizContent(currentFirstPart)}
                    </TabContent>
                    <span
                        className="backBtn"
                        onClick={() => this.backPart()}
                    ><i className="cui-arrow-left icons font-2xl d-block mt-4"></i></span>
                    <span
                        className="nextBtn"
                        onClick={() => this.nextPart()}
                    ><i className="cui-arrow-right icons font-2xl d-block mt-4"></i></span>
                    <span
                        onClick={() => this.backToListLession()}
                    ><i className="cui-chevron-left icons font-2xl d-block mt-4"></i></span>
                </Col>
                <Col>
                </Col>
            </Row>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    const {courseActives, histories, user} = state;
    const {courseID, moduleID, lessionID} = ownProps.match.params;
    const currentCourse = courseActives.find((c) => c.id == courseID);
    const currentModule = currentCourse.modules.find((m) => m.id == moduleID);
    // const currentLession = currentModule.lessions.find((l) => l.id == lessionID);

    return {
        currentModule,
        // currentLession,
        histories,
        user,
        lessionID,
        courseID,
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPartByLessionID,
        getLessionByID,
        updateHistory,
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Lession));

class EditorPreview extends Component {
    render() {
        return (
            <div className="editor-preview">
                <div dangerouslySetInnerHTML={ { __html: this.props.data } }></div>
            </div>
        );
    }
  }
  
  EditorPreview.defaultProps = {
    data: ''
  };
