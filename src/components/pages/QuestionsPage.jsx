import React, { Component, PropTypes }          from 'react';
import { Link } from 'react-router';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col } from 'react-bootstrap';
import { observable } from 'mobx';
import QuestionsTable           from '../widgets/QuestionsList';
import Spiner           from '../widgets/Spiner';


@inject('subjectStore', 'questionsStore') @observer
export default class QuestionsPage extends Component {
    static propTypes = {
        subjectStore: MobxTypes.observableObject,
        questionsStore: MobxTypes.observableObject
    };

    @observable searchQuery = '';
    @observable selectedSubject = '';

    async componentWillMount() {
        const { fetchQuestions, resetQuestion } = this.props.questionsStore;
        const { fetchSubjects  } = this.props.subjectStore;
        await resetQuestion();
        await fetchQuestions();
        await fetchSubjects();
    }

    handleSearch = (e) => {
        this.searchQuery = e.target.value;
    }

    handleChangeSubject = (e) => {
        this.selectedSubject = e.target.value;
    }

    renderSubjectsList = () => {
        const { subjects } = this.props.subjectStore;
        if(subjects) {
            return subjects.map( subject => {
                return (
                    <option key={subject.id} value={subject.id}>{subject.title} {subject.questions.length}</option>
                );
            });
        }
    }

    render() {
        const { questions, isLoading } = this.props.questionsStore;

        return (
            <div className='reletiveBlock'>
                {
                    isLoading ?
                        <Spiner />
                    : null
                }
                <Row>
                    <Row>
                        <Col md={4}>
                            <FormControl
                                type='text'
                                value={this.searchQuery}
                                onChange={this.handleSearch}
                                placeholder='Search'
                            />
                        </Col>
                        <Col md={4}>
                            <FormControl
                                componentClass="select"
                                onChange={this.handleChangeSubject}
                                value={this.selectedSubject}
                                >
                                    <option value=''>Subject</option>
                                    {this.renderSubjectsList()}
                                </FormControl>
                            </Col>
                            <Col md={4}>
                                <Link className='btn btn-default pull-right' to='/admin/questions/new'>Add New Question</Link>
                            </Col>
                        </Row>
                        {
                            questions
                            ? <QuestionsTable
                                questions   = {questions}
                                searchQuery = {this.searchQuery}
                                subject     = {this.selectedSubject}
                            />
                            : 'Questions'
                }
                </Row>
            </div>
        );
    }
}
