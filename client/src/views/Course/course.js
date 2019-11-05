import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Row, Col} from 'reactstrap';
const Markdown = require('react-markdown');

class Course extends Component {

  render() {
    const {currentCourse} = this.props;
    // console.log('router info ', this.props.match.params, this.props.currentCourse);
    return (
      // <div className="animated fadeIn">
      //   <Row>
      //     <Col>
      //       <Card>
      //         <CardHeader>
      //           <i className="fa fa-align-justify"></i><strong>Jumbotron</strong>
      //           <div className="card-header-actions">
      //             <a href="https://reactstrap.github.io/components/jumbotron/" rel="noreferrer noopener" target="_blank" className="card-header-action">
      //               <small className="text-muted">docs</small>
      //             </a>
      //           </div>
      //         </CardHeader>
      //         <CardBody>
      //           <Jumbotron>
      //             <h1 className="display-3">Hello, world!</h1>
      //             <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra
      //               attention to featured content or information.</p>
      //             <hr className="my-2" />
      //             <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
      //             <p className="lead">
      //               <Button color="primary">Learn More</Button>
      //             </p>
      //           </Jumbotron>
      //         </CardBody>
      //       </Card>
      //     </Col>
      //     <Col>
      //       <Card>
      //         <CardHeader>
      //           <i className="fa fa-align-justify"></i><strong>Jumbotron</strong>
      //           <small> fluid</small>
      //         </CardHeader>
      //         <CardBody>
      //           <Jumbotron fluid>
      //             <Container fluid>
      //               <h1 className="display-3">Fluid jumbotron</h1>
      //               <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      //             </Container>
      //           </Jumbotron>
      //         </CardBody>
      //       </Card>
      //     </Col>
      //   </Row>
      // </div>
      <div class="container">
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
