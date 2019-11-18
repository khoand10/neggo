import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Form, FormGroup, Input, Label, Button, Alert} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

import { submit } from '../../actions/index';

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
          answer: '',
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

    renderMultiQuestion() {
        return (
            <p>multi question</p>
        );
    }

    submit = async () => {
        const {question} = this.props;
        try {
            let answers = [];
            answers.push(this.state.answer);
            const rs = await this.props.submit(question.id, answers);
            console.log("nhan duoc", rs);
            if (rs.status === 200) {
                this.setState({
                    rs: rs.data.correct,
                });
                return;
            }
            this.setState({rs: false});
        } catch (error) {
            this.setState({rs: false});
        }
    }

    renderQuestion() {
        console.log('state ', this.state.rs);
        const {question} = this.props;
        const {answers} = question;
        let fail = (
            <Alert color="danger">
                Answer incorrect!
            </Alert>
        )
        let success = (
            <Alert color="success">
                Correct!
            </Alert>
        )
        return (
            <React.Fragment>
                <h3>{question.name}</h3>
                <Form>
                    <FormGroup>
                        {answers.map((item, index) => {
                            return (
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            value={item.id}
                                            name='answer' 
                                            onChange={this.handleChange} 
                                        />
                                        {item.content}
                                    </Label>
                                </FormGroup>
                            );
                        })}
                        </FormGroup>
                        {/* {this.state.rs && this.state.rs == true &&
                            <Alert color="success">
                                Correct!
                            </Alert>
                        }
                        {this.state.rs && this.state.rs == false &&
                            <Alert color="danger">
                                Answer incorrect!
                            </Alert>
                        } */}
                        {this.state.rs ? this.state.rs == true ? success : fail : null}
                        <Button
                            color="primary"
                            onClick={() => this.submit()}
                        >Submit</Button>
                </Form>
            </React.Fragment>
        )
    }

    render() {
        const {question} = this.props;
        return (
            <div>
                {question.multi === true ? this.renderMultiQuestion() : this.renderQuestion()}
            </div>
        );
    }
}

function mapStateToProps({course}, ownProps) {
    return {
    };
  }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submit,
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Quiz));
