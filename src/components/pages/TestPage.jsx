import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col, InputGroup, ButtonToolbar, Panel, Well, Modal } from 'react-bootstrap';

@inject('testStore') @observer
export default class TestPage extends Component {
    @observable isShowModal = false;
    static propTypes = {
        testStore : MobxTypes.observableObject
    };
    async componentWillMount() {
        const { testStore } = this.props;
        this.testId = this.props.location.pathname.replace('/test/', '');
        await testStore.getQuestion(this.testId);
        this.selectedAnswer = [];
    }

    handleSaveTest = () => {
        this.isShowModal = true;
    }

    close = () => {
        this.isShowModal = false;
    }

    handleNextQuestion = async () => {
        const { question, checkAnswer, getQuestion } = this.props.testStore;
        await checkAnswer({
            question : question.id,
            answer : this.answer
        }, this.testId);
        await getQuestion(this.testId);
    }

    handleSelectAnswer = async (index) => {
        const { question, checkAnswer, getQuestion } = this.props.testStore;
        this.answer = index;
        if (question.testType === 'EXAM') {
            await checkAnswer({
                question : question.id,
                answer : index
            }, this.testId);
            setTimeout(() => getQuestion(this.testId), 1000);
        }
    }

    renderAnswerList = () => {
        const { question, correct } = this.props.testStore;
        const answerIndex = question.answerIndex || undefined;
        return (
            question.answers.map((item, index) => {
                return (
                    <Col md={12}
                        key = {index+question.id}
                        className = {
                            index === answerIndex
                            ?
                            'true'
                            :
                            null
                        }>
                        <Col
                            md={12}
                            className={correct === index ? 'correct' : ''}
                        >
                            <label>
                                <input
                                    onClick = {this.handleSelectAnswer.bind(this, index)}
                                    type    ='radio'
                                    name    = 'optradio'
                                >
                                </input>
                                { item }
                            </label>
                        </Col>
                    </Col>
                );
            })
        );
    }

    render() {
        const { question } = this.props.testStore;
        return (
            <Row>
                <Button onClick={this.handleSaveTest}>Save</Button>
                {
                    question.code ?
                    <Col md={6} mdOffset={3}>
                        <Panel>
                            <h4>Test completed</h4> <br/>
                            Your result: { question.test.result }%
                        </Panel>
                    </Col>
                    :
                    <Col md={6} mdOffset={3}>
                        <Panel>
                            {question.text}
                        </Panel>
                        {question.answers ? this.renderAnswerList() : null}
                        {
                            question.testType === 'TESTING' ?
                            <button onClick={this.handleNextQuestion}>NEXT</button>
                            :
                            null
                        }
                    </Col>
                }
                <Modal show={this.isShowModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        Save the code to restore session
                    </Modal.Header>
                    <Modal.Body>
                        <h4 className='alignCenter'>{this.testId}</h4>
                    </Modal.Body>
                </Modal>
            </Row>


        );
    }
}
