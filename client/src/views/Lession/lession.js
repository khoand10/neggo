import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col, Badge, ButtonGroup, Button} from 'reactstrap';
import {compare} from '../../utils/helper';
import Quiz from '../Quiz/quiz';

import {getPartByLessionID} from'../../actions/part';

const Markdown = require('react-markdown');

class Lession extends Component {

  constructor(props) {
      super(props);
      this.state = {
          currentIndexPart: 0,
          currentPart: [],
      }
  }

  componentDidMount() {
    const {lessionID} = this.props;
    this.props.getPartByLessionID(lessionID).then(
        (rs) => {
            this.setState({currentPart: rs});
        }
    )
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

  render() {
    const {currentCourse, currentModule, currentLession} = this.props;
    const {currentIndexPart, currentPart} = this.state;
    const parts = currentPart.sort(compare);
    const currentFirstPart = parts[currentIndexPart];
    console.log('parts' , parts, currentPart);
    if (!currentFirstPart) {
        return null;
    }
    console.log('curr', currentFirstPart);
    
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
                    {parts.map((item, index) => {
                        if (item.type === true) {
                            return (
                                <Button
                                    onClick={() => this.setState({currentIndexPart: index})}
                                >Quiz</Button>
                            );
                        } else {
                            return (
                                <Button
                                    onClick={() => this.setState({currentIndexPart: index})}
                                >Doc</Button>
                            );
                        }
                    })}
                    {currentFirstPart.type !== true ? this.renderDocContent(currentFirstPart) : this.renderQuizContent(currentFirstPart)}
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
        currentLession,
        lessionID,
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPartByLessionID,
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Lession));
