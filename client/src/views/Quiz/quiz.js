import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Form, FormGroup, Input, Label, Button, Alert} from 'reactstrap';

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
        const {question, item} = this.props;
        try {
            let answers = [];
            answers.push(this.state.answer);
            const rs = await this.props.submit(question.id, answers);
            if (rs.status === 200) {
                if (rs.data.correct === true) {
                    this.setState({
                        correct: true,
                    });
                    this.props.passQuiz(item);
                } else {
                    this.setState({
                        incorrect: true,
                    });
                }
                setTimeout(() => {
                    this.setState({correct: false, incorrect: false})
                }, 3000);
                return;
            }
            this.setState({
                incorrect: true,
            });
        } catch (error) {
            console.log('errror ', error);
            this.setState({
                incorrect: true,
            });
        }
        setTimeout(() => {
            this.setState({correct: false, incorrect: false})
        }, 3000);
    }

    renderQuestion() {
        const {question} = this.props;
        const {answers} = question;
        return (
            <React.Fragment>
                <h5>{question.name}</h5>
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
                        {this.state.correct && this.state.correct == true &&
                            <Alert color="success">
                                Correct!
                            </Alert>
                        }
                        {this.state.incorrect && this.state.incorrect == true &&
                            <Alert color="danger">
                                Answer incorrect!
                            </Alert>
                        }
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
