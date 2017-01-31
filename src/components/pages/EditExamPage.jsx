import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col, Jumbotron } from 'react-bootstrap';
import { observable } from 'mobx';

import ExamSubjectsList from '../widgets/ExamSubjectsList.jsx';
@inject('examsStore', 'specialitiesStore', 'subjectStore') @observer
export default class ExamsPage extends Component {
    @observable subject;
    @observable count;

    static propTypes = {
        examsStore        : MobxTypes.observableObject,
        specialitiesStore : MobxTypes.observableObject
    };

    async componentWillMount () {
        const { fetchExams } = this.props.examsStore;
        const { fetchSubjects } = this.props.subjectStore;
        const { fetchSpecialities } = this.props.specialitiesStore;
        const { fetchExam, exam } = this.props.examsStore;
        await fetchExams();
        await fetchSubjects();
        await fetchSpecialities();
        this.examId = this.props.location.pathname.replace('/admin/exams/', '');
        await fetchExam(this.examId);
    }

    handleAddSubject = () => {
        const { updateExam, exam } = this.props.examsStore;
        const subjects = JSON.parse(JSON.stringify(exam.subjects));
        subjects.push({ subject : this.subject, count : this.count });
        updateExam(this.examId, { subjects })
        this.subject = '';
        this.count = '';
    }

    handleChangeSubject = (e) => {
        this.subject = e.target.value;
    }

    handleChangeCount = (e) => {
        this.count = e.target.value;
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
        return (
            <Row>
                <Row>
                    <Col md={3}>
                        <FormControl
                            componentClass="select"
                            onChange={this.handleChangeSubject}
                            value={this.subject}
                        >
                            <option value=''>Subject</option>
                            {this.renderSubjectsList()}
                        </FormControl>
                    </Col>
                    <Col md={6}>
                        <FormControl
                            type='number'
                            onChange={this.handleChangeCount}
                            value={this.count}
                            placeholder='Count'
                        >
                        </FormControl>
                    </Col>
                    <Col md={3}>
                        <Button onClick={this.handleAddSubject} disabled={!(this.subject && this.count)}>Add</Button>
                    </Col>
                </Row>
                <ExamSubjectsList/>
            </Row>
        );
    }
}
