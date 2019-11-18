import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Card, CardBody, CardFooter, CardHeader, Col, Row, Button, Badge, CardText} from 'reactstrap';

class Home extends Component {

  getTotalLession = (module) => {
    console.log('trace', module);
    let totalLession = 0;
    for (let i = 0; i < module.length; i++) {
      const element = module[i];
      totalLession += element.lessions.length;      
    }
    return totalLession;
  }

  render() {
    const {course} = this.props;
    return (
      
        <Row>
            {course ? course.map((item, id) => {
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
                        <Button
                          onClick={() => this.props.history.push(`/course/${item.id}`)}
                        >More</Button>
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
    );
  }
}

function mapStateToProps({course}) {
  return {
    course
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Home));
