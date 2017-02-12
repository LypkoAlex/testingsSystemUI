import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col, InputGroup, ButtonToolbar, Panel, Img } from 'react-bootstrap';
import { observable }     from 'mobx';
import uuid               from 'uuid';
import { Link }           from 'react-router';
import { browserHistory } from 'react-router'
import Spiner             from '../widgets/Spiner';


@inject('questionsStore', 'subjectStore') @observer
export default class QuestionEditor extends Component {
    @observable answers = {};
    @observable subject;
    @observable text;
    @observable answerIndex;
    @observable img = '';

    static propTypes = {
        questionsStore : MobxTypes.observableObject,
        subjectStore   : MobxTypes.observableObject
    };

    async componentWillMount() {
        const { fetchSubjects } = this.props.subjectStore;
        const { fetchQuestions, fetchQuestion, question} = this.props.questionsStore;
        this.questionId = this.props.location.pathname.replace('/questions/', '');
        await fetchSubjects();
        await fetchQuestion(this.questionId);
        this.key = uuid.v4();
    }

    handleChangeText = async (e) => {
        this.text = e.target.value;
    }

    handleClickSave = async (isNew) => {
        const { createQuestion, updateQuestion, resetQuestion, question } = this.props.questionsStore;
        const set = {};

        if (this.subject)     set.subject = this.subject;
        if (this.text)        set.text = this.text;
        if (this.img)         set.img = this.img;
        if (this.answerIndex) set.answerIndex = this.answerIndex * 1;
        if (Object.values(this.answers).length){
            if (this.questionId === 'new') {
                set.answers = Object.values(this.answers);
            } else {
                const editedIndex = Object.keys(this.answers)[Object.keys(this.answers).length - 1];
                const count = editedIndex < question.answers.length ? question.answers.length : editedIndex+1;
                let answers = [];
                for(let i = 0; i < count; i++) {
                    let answer = (question.answers[i] && !this.answers[i]) ? this.answers[i] : question.answers[i];
                    answers.push(this.answers[i] || question.answers[i])
                }

                set.answers = answers;
            }
        }
        if (this.questionId === 'new') {
            createQuestion(this.subject, set)
        } else {
            updateQuestion(this.questionId, set)
        }
        this.subject = '';
        this.answers = {};
        this.text = '';
        this.answerIndex = -1;
        this.img = '';
        if (isNew) {
            this.questionId = 'new';
        }
        resetQuestion();
        browserHistory.push(isNew ? '/admin/questions/new' : '/admin/questions'); // cskjvhskjlvhdkj
    }

    handleChangeAnswerIndex = (e) => {
        this.answerIndex = e.target.value;
    }

    handleChangeSubject = (e) => {
        this.subject = e.target.value;
    }

    handleChangeAnswer = (index, e) => {
        this.answers[index] = e.target.value;
        this.forceUpdate();
    }

    renderSubjectsList = () => {
        const { subjects } = this.props.subjectStore;
        return subjects.map( subject => {
            return (
                <option key={subject.id} value={subject.id}>{subject.title}</option>
            );
        });
    }

    previewFile = (e) => {
        const file = e.target.files[0];
        const reader  = new FileReader();

        reader.onloadend =  () => {
            this.img = reader.result;
        }

        if (file) {
        reader.readAsDataURL(file);
        } else {
            this.img = '';
        }
    }

    renderAnswersList = (count) => {
        const { question } = this.props.questionsStore;
        const arr = [];
        for(let i = 0; i < count; i++) {
            arr.push(
                <FormGroup key={i + this.questionId + this.key} className='questionForm'>
                    <InputGroup>
                        <FormControl
                            type="text"
                            onChange = {this.handleChangeAnswer.bind(this, i)}
                            defaultValue={question && question.answers ? question.answers[i] : ''}
                            value={this.answers[i]}
                            placeholder={'Enter possible answer'}
                            disabled
                        />
                        <InputGroup.Addon>
                            <input
                                key={i + this.key}
                                type           ="radio"
                                name           ="answers"
                                value          ={i}
                                onChange       ={this.handleChangeAnswerIndex}
                                defaultChecked ={ (question && question.answers) && question.answerIndex === i}
                                disabled
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
                        <Col md={6} mdOffset={3} className='questionForm'>
                            <Panel>
                                <FormControl
                                    onChange={this.handleChangeSubject}
                                    componentClass='select'
                                    defaultValue={question && question.subject ? question.subject : ''}
                                    value={this.subject}
                                    disabled
                                >
                                    <option value=''>Select subject</option>
                                    {this.renderSubjectsList()}
                                </FormControl>
                                <FormControl
                                    disabled
                                    componentClass="textarea"
                                    placeholder="textarea"
                                    onChange={this.handleChangeText} name='text'
                                    defaultValue={question && question.text ? question.text : ''}
                                    value={this.text}
                                />
                                {this.renderAnswersList(6)}
                                <input disabled type="file" accept="image/jpeg,image/png,image/gif" onChange={this.previewFile}/> <br/>
                                {this.img || ( question && question.img ) ?
                                    <img
                                        src={this.img || question.img}
                                        height='200'
                                        alt='Image preview...'
                                        className='img-thumbnail'
                                    /> :
                                    null
                                }
                            </Panel>
                        </Col>
                    </Row> :
                    <div className='reletiveBlock'>
                        <Spiner />
                    </div>
                }
            </Row>
        );
    }
}
