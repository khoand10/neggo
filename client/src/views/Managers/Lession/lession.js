import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Form, Row, Col, Label, Input, FormGroup, Button, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import CKEditor from 'ckeditor4-react';

import {compare} from '../../../utils/helper';

import Quiz from '../../Quiz/quiz';

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
        type: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
  }

   async componentWillMount() {
    await this.getAllPartByLessionID();
    if (this.state.parts.length > 0) {
      this.setState({currentTypePart: this.state.parts[0].type});
    }
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

  onChangeContent(evt){
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent
    })
  }

  toggle = async (tab, item) => {
    const {currentIndexPart, parts} = this.state;
    console.log('toggle ', parts[tab], currentIndexPart);
    if(currentIndexPart !== tab) {
        await this.getAllPartByLessionID();
        this.setState({
            currentIndexPart: tab,
            currentTypePart: parts[tab].type,
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
        // partID: part.id,
    }
    const rs = await this.props.createQuestion(newQuestion);
    if (rs.status === 200) {
        const newPart = {...part};
        newPart.type = true;
        await this.props.updatePart(newPart);
        this.getAllPartByLessionID();
    }
  }

  renderDocContent(currentPart) {
    return (
        <EditorPreview data={currentPart ? currentPart.content : ''} />
    )
  }

  renderQuizContent(currentPart) {
    return (
        <Quiz item={currentPart} question={currentPart.questions[0] ? currentPart.questions[0] : null} passQuiz={this.passQuiz}/>
    );
  }

  render() {
    const {parts, currentIndexPart, currentTypePart, type} = this.state;
    
    const partDisplay = parts.sort(compare);
    const currentPart = partDisplay[currentIndexPart];
    return (
      <div>
        <h2>{this.props.lession.name}</h2>
        <Form>
            <FormGroup check>
                <Label check>
                <Input type="checkbox" name="type" onChange={this.handleChange} checked={type}/>{' '}
                {'Quiz'}
                </Label>
            </FormGroup>
            {this.state.currentTypePart != true && 
              <React.Fragment>
                <Row>
                    <Col>
                    <Label for="name">Name</Label>
                    <Input onChange={this.handleChange} type="text" name="name" id="name" placeholder="part name" value={this.state.name} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Label for="content">Content</Label>
                    <CKEditor onChange={this.onChangeContent} name="content" data={this.state.content} />
                    </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                        onClick={() => this.createPart()}
                        color="primary"
                    >
                        {'New Part'}
                    </Button>
                  </Col>
                </Row>
              </React.Fragment>
            }
            {this.state.type == true && 
              <React.Fragment>
                <FormGroup>
                    <Label for="question">Question Name</Label>
                    <Input onChange={this.handleChange} type="text" name="questionName" id="questionName" placeholder="question name" defaultValue={''} />
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
              </React.Fragment>
            }
            {partDisplay.length > 0 ?
                <React.Fragment>
                    <Nav tabs>
                        {partDisplay.map((item, index) => {
                            if (item.type === true) {
                                return (
                                    <NavItem>
                                        <NavLink
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
                                        className={classnames({ active: currentIndexPart === index})}
                                        onClick={() => this.toggle(index, item)}
                                    >Theory</NavLink>
                                    </NavItem>
                                );
                            }
                        })}
                    </Nav>
                    <TabContent activeTab={currentIndexPart}>
                        {currentPart !== true ? this.renderDocContent(currentPart) : this.renderQuizContent(currentPart)}
                    </TabContent>
                </React.Fragment> : null
            }
            <FormGroup>
              <Button
                onClick={() => this.props.back()}
                color="warning"
              >
                {'Back'}
              </Button>
            </FormGroup>
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
