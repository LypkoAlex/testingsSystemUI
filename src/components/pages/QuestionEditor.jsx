import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col, InputGroup, ButtonToolbar } from 'react-bootstrap';
import { observable } from 'mobx';
import { browserHistory } from 'react-router'
import uuid from 'uuid';

@inject('questionsStore', 'subjectStore') @observer
export default class QuestionEditor extends Component {
    @observable answers = {};
    @observable subject;
    @observable text;
    @observable answerIndex;

    static propTypes = {
        questionsStore : MobxTypes.observableObject,
        subjectStore   : MobxTypes.observableObject
    };

    async componentWillMount() {
        const { fetchSubjects } = this.props.subjectStore;
        const { fetchQuestions, fetchQuestion, question} = this.props.questionsStore;
        this.questionId = this.props.location.pathname.replace('/admin/questions/', '');
        await fetchSubjects();
        await fetchQuestion(this.questionId);
    }

    handleChangeText = async (e) => {
        this.text = e.target.value;
    }

    handleClickSave = async (isNew) => {
        const { createQuestion, updateQuestion, question } = this.props.questionsStore;
        const set = {};

        if (this.subject)     set.subject = this.subject;
        if (this.text)        set.text = this.text;
        if (this.answerIndex) set.answerIndex = this.answerIndex;
        if (Object.values(this.answers).length){
            if (this.questionId === 'new') {
                set.answers = Object.values(this.answers);
            } else {
                set.answers = question.answers.map((item, index) => {
                    return this.answers[index] || item;
                });
            }
        }
        if (this.questionId === 'new') {
            await createQuestion(this.subject, set)
        } else {
            await updateQuestion(this.questionId, set)
        }
        this.subject = '';
        this.answers = {};
        this.text = '';
        this.answerIndex = -1;
        browserHistory.push('/admin/questions');
    }

    handleChangeAnswerIndex = (e) => {
        this.answerIndex = e.target.value;
        console.log(e.target.value);
    }

    handleChangeSubject = (e) => {
        this.subject = e.target.value;
    }

    handleChangeAnswer = (index, e) => {
        this.answers[index] = e.target.value;
        console.log(this.answers);
    }

    renderSubjectsList = () => {
        const { subjects } = this.props.subjectStore;
        return subjects.map( subject => {
            return (
                <option key={subject.id} value={subject.id}>{subject.title}</option>
            );
        });
    }

    renderAnswersList = (count) => {
        const { question } = this.props.questionsStore;
        const arr = [];
        for(let i = 0; i < count; i++) {
            arr.push(
                <FormGroup key={i+this.questionId}>
                    <InputGroup>
                        <FormControl
                            type="text"
                            onChange = {this.handleChangeAnswer.bind(this, i)}
                            defaultValue={question && question.answers ? question.answers[i] : ''}
                            value={this.answers[i]}
                            placeholder={'Enter possible answer'}
                        />
                        <InputGroup.Addon>
                            <input
                                type="radio"
                                name="answers"
                                value={i}
                                onChange={this.handleChangeAnswerIndex}
                                defaultChecked={ (question && question.answers) && question.answerIndex === i}
                            />
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
            )
        }
        return arr;
    }

    render() {
        const { question } = this.props.questionsStore;
        return (
            <Row>
                { (question && question.answers) || this.questionId === 'new' ?
                    <Row>
                        <ButtonToolbar className='col-centered'>
                            <Button
                                disabled={ this.questionId === 'new' ? !(this.subject && this.answers && this.text && this.answerIndex) : false }
                                onClick={this.handleClickSave}>Save</Button>
                            <Button onClick={this.handleClickSave}>Save and New</Button>
                            <Button onClick={this.handleClickSave}>Close</Button>
                        </ButtonToolbar>
                        <Col md={6} mdOffset={3}>
                                <FormControl
                                    onChange={this.handleChangeSubject}
                                    componentClass='select'
                                    defaultValue={question && question.subject ? question.subject : ''}
                                    value={this.subject}
                                >
                                    <option value=''>Select subject</option>
                                    {this.renderSubjectsList()}
                                </FormControl>
                        </Col>
                        <Col md={6} mdOffset={3}>
                            <FormControl
                                componentClass="textarea"
                                placeholder="textarea"
                                onChange={this.handleChangeText} name='text'
                                defaultValue={question && question.text ? question.text : ''}
                                value={this.text}
                            />
                        </Col>
                        <Col md={6} mdOffset={3}>
                            {this.renderAnswersList(6)}
                        </Col>
                    </Row> :
                    null
                }
            </Row>
        );
    }
}
