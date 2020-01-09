import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";

import {updateHistory} from '../../actions/history';

import {Card, CardBody, CardFooter, CardHeader, Col, Row, Button, Badge, CardText, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';

class Home extends Component {

  getTotalLession = (module) => {
    let totalLession = 0;
    for (let i = 0; i < module.length; i++) {
      const element = module[i];
      totalLession += element.lessions.length;      
    }
    return totalLession;
  }

  takeThisCourse = (item) => {
    const {user, histories} = this.props;
    this.props.history.push(`/course/${item.id}`);
    if (!histories) {
      const newHistory = {};
      newHistory[item.id] = {};
      const newData = {
        userID: user.id,
        history: JSON.stringify(newHistory),
      }
      this.props.updateHistory(newData);
    } else if (!histories[item.id]) {
      const newHistory = {...histories};
      newHistory[item.id] = {};
      const newData = {
        userID: user.id,
        history: JSON.stringify(newHistory),
      }
      this.props.updateHistory(newData);
    }
  }

  render() {
    const {course} = this.props;
    let listCourse = [];
    if (course && course.length > 3) {
      listCourse[0] = course[0];
      listCourse[1] = course[1];
      listCourse[2] = course[3];
    } else if (course) {
      listCourse = [...course];
    }
    return (
        <React.Fragment>
          <Col xs="12" xl="12">
            <Card inverse>
              <CardImg className="bgr-img" top src="../../assets/img/bgr2.jpeg" alt="Card image cap" />
              <CardImgOverlay>
                <div className="slide-text">
                  <h1>Free, fun, effective learning - what can be better?</h1>
                  <Button onClick={() => this.props.history.push('/courses')} size={'lg'} block color="success" className="btn-pill start-learning-btn">Start Learning Now</Button>
                </div>
              </CardImgOverlay>
            </Card>
          </Col>
          <Row>
              {listCourse ? listCourse.map((item, id) => {
                  // const totalLession = this.getTotalLession(item.modules);
                  const totalLession = 10;
                  return (
                  <Col xs="12" md="7" sm="6" md="4">
                      <Card>
                      <CardHeader>
                          {item.name}
                      </CardHeader>
                      <CardBody>
                      <CardText>
                          {item.description}
                      </CardText>
                          <Button type="submit" size="sm" color="primary"
                            onClick={() => this.takeThisCourse(item)}
                          ><i className="fa fa-dot-circle-o"></i>Take this course</Button>
                      </CardBody>
                      <CardFooter>
                        <Row>
                          <Col sm={4}>
                              <div class="callout callout-info">
                                <small class="text-muted">Lessions</small><br/>
                                <strong class="h4">{totalLession}</strong>
                              </div>
                          </Col>
                          <Col sm={4}>
                              <div class="callout callout-info">
                                <small class="text-muted">Quizzes</small><br/>
                                <strong class="h4">257</strong>
                              </div>
                          </Col>
                        </Row>
                      </CardFooter>
                      </Card>
                  </Col>
                  )
                  })
              : (null)}
          </Row>
        </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const {courseActives, user, histories} = state;
  return {
    course: courseActives,
    user,
    histories,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateHistory,
  }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(withRouter(Home)));
