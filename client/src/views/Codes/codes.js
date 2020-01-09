import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";

import {Row, Col, FormGroup, Label, Input, Button} from 'reactstrap';
import {runCode} from '../../actions/code';

const modes = [
  {name: 'java'},
  {name: 'javascript'},
  {name: 'python'}
];

const themes = [
  {name: 'monokai'},
  {name: 'github'},
  {name: 'solarized_dark'},
  {name: 'solarized_light'},
  {name: 'terminal'}
];

class Codes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'java',
      theme: 'monokai',
      code: '',
      result: '',
      runError: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  onChange = (newValue) => {
    this.setState({code: newValue});
  }

  runCode = async () => {
    const formSubmit = {
      lang: this.state.mode,
      code: this.state.code,
    }
    const rs = await this.props.runCode(formSubmit);
    if (rs.status === 200) {
      const result = rs.data;
      if (result.exitCode === 0) {
        this.setState({
          result: result.stdout,
          runError: false,
        });
      } else {
        this.setState({
          result: result.stderr,
          runError: true,
        });
      }
    }
  }

  render() {
    return (
        <div className="container-fluid">
            <Row>
              <Col
                md={2}
                className='course-info'
              >
                <FormGroup>
                  <Label for="exampleMode">Mode:</Label>
                  <Input type="select" name="mode" id="mode" onChange={this.handleChange} value={this.state.mode}>
                    {modes.map((item) => {
                      return (
                        <option value={item.name}>{item.name}</option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleTheme">Theme:</Label>
                  <Input type="select" name="theme" id="theme" onChange={this.handleChange} value={this.state.theme}>
                    {themes.map((item) => {
                      return (
                        <option value={item.name}>{item.name}</option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Button
                    color="secondary"
                    onClick={() => this.setState({code: ''})}
                  >
                    Clear
                  </Button>
                  <Button
                    color="success"
                    onClick={() => this.runCode()}
                  >
                    Run
                  </Button>
                </FormGroup>
              </Col>
              <Col
                md={5}
              >
                <AceEditor
                  mode={this.state.mode}
                  theme={this.state.theme}
                  onChange={this.onChange}
                  name="UNIQUE_ID_OF_DIV"
                  placeholder="typing your code"
                  editorProps={{ $blockScrolling: true }}
                  fontSize={12}
                  value={this.state.code}
                />
                <FormGroup>
                  <Label for="exampleText">Output:</Label>
                  <Input 
                    bsSize="lg" 
                    className="output" 
                    type="textarea" 
                    name="result" 
                    id="result" 
                    value={this.state.result} 
                    disabled={true}
                    invalid={this.state.runError}
                  />
                </FormGroup>
                <button onClick={() => this.setState({result: '', runError: false})}>Clear</button>
              </Col>
            </Row>
        </div>
    );
  }
}

function mapStateToProps(state, props) {
    return {
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      runCode,
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Codes));
