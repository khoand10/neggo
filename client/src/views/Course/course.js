import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {compare} from '../../utils/helper';

import Module from '../module/module';
const Markdown = require('react-markdown');

class Course extends Component {

  render() {
    const {currentCourse} = this.props;
    currentCourse.modules.sort(compare);
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
                {/* <Markdown source={currentCourse.courseInfo} /> */}
                <EditorPreview data={currentCourse.courseInfo} />
              </Col>
            </Row>
            <Row className="list-lession">
              {currentCourse && currentCourse.modules.map((item, index) => {
                // const lessions = item.lessions.sort(compare);
                return (
                  <Module moduleID={item.id} module={item} courseID={currentCourse.id}/>
                  // <ListGroup>
                  //   <ListGroupItem active tag="button" action>{item.name}</ListGroupItem>
                  //   {lessions.map((lession, index) => {
                  //     return (
                  //       <ListGroupItem
                  //         tag="button"
                  //         action
                  //         onClick={() => this.props.history.push(`/lession/${currentCourse.id}/${item.id}/${lession.id}`)}
                  //       >{lession.name}</ListGroupItem>
                  //     );
                  //   })}
                  // </ListGroup>
                );
              })}
            </Row>
          </Col>
        </Row>
        {/* <Row>
          <Col
              md={6}
              className='course-info'
          >
            <Row className="list-lession">
              {modules.map((item, index) => {
                const lessions = item.lessions.sort(compare);
                return (
                  <ListGroup>
                    <ListGroupItem active tag="button" action>{item.name}</ListGroupItem>
                    {lessions.map((lession, index) => {
                      return (
                        <ListGroupItem
                          tag="button"
                          action
                          onClick={() => this.props.history.push(`/lession/${lession.id}`)}
                        >{lession.name}</ListGroupItem>
                      );
                    })}
                  </ListGroup>
                );
              })}
            </Row>
          </Col>
          </Row> */}
      </div>
    );
  }
}

function mapStateToProps({courseActives}, ownProps) {
    const courseID = ownProps.match.params.id;
    const currentCourse = courseActives.find((c) => c.id == courseID);
    return {
        currentCourse
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Course));

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
