import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
const Markdown = require('react-markdown');

class Course extends Component {

  render() {
    const {currentCourse} = this.props;
    return (
      <div class="container-fluid">
        <Row>
          <Col
            md={6}
            className='course-info'
          >
            <Row>
              <Col sm={2}>
                <img src={currentCourse.logo} alt="..."/>
              </Col>
              <Col sm={9}>
                <h3>{currentCourse.name}</h3>
                <Markdown source={currentCourse.courseInfo} />
              </Col>
            </Row>
            <Row className="list-lession">
              {currentCourse && currentCourse.modules.map((item, index) => {
                return (
                  <ListGroup>
                    <ListGroupItem active tag="button" action>{item.name}</ListGroupItem>
                    {item.lessions.map((lession, index) => {
                      return (
                        <ListGroupItem
                          tag="button"
                          action
                        >{lession.name}</ListGroupItem>
                      );
                    })}
                  </ListGroup>
                );
              })}
              {/* <ListGroup>
                <ListGroupItem active tag="button" action>Cras justo odio</ListGroupItem>
                <ListGroupItem
                  tag="button"
                  action
                  onClick={() => alert("Hello")}
                >aaaaaaa</ListGroupItem>
                <ListGroupItem>bbbbbbb</ListGroupItem>
              </ListGroup> */}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps({course}, ownProps) {
    const courseID = ownProps.match.params.id;
    const currentCourse = course.find((c) => c.id == courseID);
    return {
        currentCourse
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Course));
