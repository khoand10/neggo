import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {c, cpp, node, python, java} from 'compile-run';

import {Row} from 'reactstrap';

class Codes extends Component {

  render() {
    
    return (
        <Row>
        </Row>
    );
  }
}

function mapStateToProps(state, props) {
    return {
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Codes));
