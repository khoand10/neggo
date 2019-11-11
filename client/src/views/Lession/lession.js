import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, Badge, ButtonGroup, Button} from 'reactstrap';

const Markdown = require('react-markdown');

class Lession extends Component {

  constructor(props) {
      super(props);
      this.state = {
          currentIndexPart: 0,
      }
  }

  render() {
    const {currentCourse, currentModule, currentLession} = this.props;
    const {currentIndexPart} = this.state;
    
    return (
        <div class="container-fluid">
            <Row>
                <Col
                    md={7}
                    className='course-info'
                >
                    <h4>{currentModule.name}</h4>
                    <Badge color="secondary">{currentLession.name}</Badge>
                </Col>
            </Row>
            <Row>
                <Col
                    md={7}
                    className='course-info'
                >
                    {currentLession.parts.map((item, index) => {
                        if (item.type == true) {
                            return (
                                <Button>Quiz</Button>
                            );
                        } else {
                            return (
                                <Button>Doc</Button>
                            );
                        }
                    })}
                    {/* {currentLession.parts[currentIndexPart].type == true ? null : */}

                    <h5>{currentLession.parts[currentIndexPart] ? currentLession.parts[currentIndexPart].name : ''}</h5>
                    <Markdown source={currentLession.parts[0] ? currentLession.parts[0].content : ''} />
                    {/* } */}
                    {/* <p>{currentLession.parts[0] ? currentLession.parts[0].content : ''}</p> */}
                </Col>
            </Row>
        </div>
    );
  }
}

function mapStateToProps({course}, ownProps) {
    const {courseID, moduleID, lessionID} = ownProps.match.params;
    const currentCourse = course.find((c) => c.id == courseID);
    const currentModule = currentCourse.modules.find((m) => m.id == moduleID);
    const currentLession = currentModule.lessions.find((l) => l.id == lessionID);
    return {
        currentCourse,
        currentModule,
        currentLession
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Lession));
