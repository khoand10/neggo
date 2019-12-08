import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Form, Row, Col, Label, Input, FormGroup, Button, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';

import {getPartByLessionID, createPart, updatePart} from '../../../actions/part';
import {createQuestion} from '../../../actions/question';
import classnames from 'classnames';

class Lession extends Component {

  constructor() {
    super();
    this.state = {
        parts: [],
        currentIndexPart: 0,
        name: '',
        content: '',
        questionName: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

   async componentWillMount() {
    await this.getAllPartByLessionID();
  }

  getAllPartByLessionID = async () => {
    const {lession} = this.props;
      const rs = await this.props.getPartByLessionID(lession.id);
      if (rs.status === 200) {
        this.setState({parts: rs.data});
      }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  toggle = tab => {
    const {currentIndexPart, parts} = this.state;
    if(currentIndexPart !== tab) {
        this.setState({
            currentIndexPart: tab,
            currentTypePart: parts[currentIndexPart].type,
        });
    }
  }

  createPart = async () => {
    const slot = this.state.parts ? this.state.parts.length + 1 : 1;
    const newPart = {
      name: this.state.name,
      content: this.state.content,
      lessionID: this.props.lession.id,
      slot,
      type: false,
    }
    try {
      const rs = await this.props.createPart(newPart);
      if (rs.status === 200) {
        this.getAllPartByLessionID();
        this.setState({
            name: '',
            content: '',
        });
      } else {
      }
    } catch (error) {
    }
  }

  createQuestion = async (part) => {
    const newQuestion = {
        name: this.state.questionName,
        multi: this.state.questionIsMulti,
        partID: part.id,
    }
    const rs = await this.props.createQuestion(newQuestion);
    if (rs.status === 200) {
        const newPart = {...part};
        newPart.type = true;
        await this.props.updatePart(newPart);
        this.getAllPartByLessionID();
    }
  }

  render() {
    const {parts, currentIndexPart, currentTypePart} = this.state;
    console.log('test ', currentTypePart);
    return (
      <div>
        <h2>{this.props.lession.name}</h2>
        <Form>
            <Row>
                <Col>
                <Label for="name">Name</Label>
                <Input onChange={this.handleChange} type="text" name="name" id="name" placeholder="part name" value={this.state.name} />
                </Col>
            </Row>
            <Row>
                <Col>
                <Label for="content">Content</Label>
                <Input onChange={this.handleChange} type="textarea" name="content" id="description" placeholder="part content" value={this.state.content} />
                </Col>
            </Row>
            <Button
                onClick={() => this.createPart()}
            >
                {'New Part'}
            </Button>
            {parts.length > 0 ?
                <React.Fragment>
                    <Nav tabs>
                        {parts.map((item, index) => {
                            return (
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.currentIndexPart === index})}
                                        onClick={() => this.toggle(index)}
                                    >
                                    {item.slot}</NavLink>
                                </NavItem>
                            )
                        })}
                    </Nav>
                    <TabContent activeTab={this.state.currentIndexPart}>
                        <h3>{parts[currentIndexPart].name}</h3>
                        <Form>
                            <FormGroup check>
                                <Label check>
                                <Input type="checkbox" name="currentTypePart" onChange={this.handleChange} checked={currentTypePart}/>{' '}
                                {'Quiz'}
                                </Label>
                            </FormGroup>
                            {currentTypePart == true &&
                                <div>
                                    <FormGroup>
                                        <Label for="question">Name</Label>
                                        <Input onChange={this.handleChange} type="text" name="questionName" id="questionName" placeholder="question name" defaultValue={parts[currentIndexPart].questions[0] ? parts[currentIndexPart].questions[0].name : ''} />
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                        <Input type="checkbox" name="questionIsMulti" onChange={this.handleChange} checked={this.state.questionIsMulti}/>{' '}
                                        {'Is multi'}
                                        </Label>
                                    </FormGroup>
                                    <Button
                                        color="primary"
                                        onClick={() => this.createQuestion(parts[currentIndexPart])}
                                    >
                                        {'New Question'}
                                    </Button>
                                </div>
                            }
                        </Form>
                    </TabContent>
                </React.Fragment> : null
            }
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return {
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPartByLessionID,
        createPart,
        createQuestion,
        updatePart,
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Lession));
