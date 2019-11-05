import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Card, CardBody, CardFooter, CardHeader, Col, Row, Button, Badge, CardText} from 'reactstrap';

class Home extends Component {

  render() {
    const {course} = this.props;
    return (
      
        <Row>
            {course ? course.map((item, id) => {
                return (
                <Col xs="12" sm="6" md="4">
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
                              <strong class="h4">9,123</strong>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div class="callout callout-info">
                              <small class="text-muted">Quizzes</small><br/>
                              <strong class="h4">257</strong>
                            </div>
                        </Col>
                      </Row>
                        {/* <Button color="primary" outline>
                        Lessions <Badge color="secondary">92</Badge>
                        </Button>
                        <Button color="primary" outline>
                        Quizzes <Badge color="secondary">257</Badge>
                        </Button> */}
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
