import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { browserHistory }              from 'react-router';
import { observable }  from 'mobx';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col, InputGroup, ButtonToolbar } from 'react-bootstrap';

@inject('specialitiesStore', 'examsStore', 'subjectStore', 'testStore') @observer

class TestingPage extends Component {
    @observable examId;
    @observable type;
    @observable specialityId;
    @observable subjectId;
    static propTypes = {
        specialitiesStore: MobxTypes.observableObject,
        subjectsStore    : MobxTypes.observableObject,
        testStore        : MobxTypes.observableObject,
        examsStore       : MobxTypes.observableObject
    };
    async componentWillMount() {
        const { specialitiesStore } = this.props;
        await specialitiesStore.fetchSpecialities();
    }

    handleStart = async () => {
        const { testStore } = this.props;
        const test = await testStore.createTest(this.examId, {
            speciality : this.specialityId,
            subject    : this.subjectId,
            type       : this.type
        });
        browserHistory.push(`/test/${test.id}`)
    }

    handleSpecialitySelect = async (e) => {
        const { examsStore } = this.props;
        this.specialityId = e.target.value;
        await examsStore.fetchExamsById(e.target.value);
    }

    handleTypeSelect = async (e) => {
        const { subjectStore } = this.props;
        this.type = e.target.value;
        if (e.target.value === 'TESTING') {
            subjectStore.fetchSubjectsBySpeciality(this.specialityId);
        }
    }

    handleExamsSelect = async (e) => {
        this.examId = e.target.value;
        console.log(this.examId);
    }

    handleSubjectSelect = async (e) => {
        this.subjectId = e.target.value;
    }

    renderSpecialitiesList = () => {
        const { specialities } = this.props.specialitiesStore;
        console.log(specialities);
        return specialities.map( speciality => {
            console.log(speciality.title);
            return (
                <option key={speciality.id} value={speciality.id}>{speciality.title}</option>
            );
        });
    }

    renderExamsList = () => {
        const { exams } = this.props.examsStore;
        if(exams) {
            return exams.map( exam => {
                return (
                    <option key={exam.id} value={exam.id}>{exam.title}</option>
                );
            });
        }
    }

    renderSubjectsList = () => {
        const { subjects } = this.props.subjectStore;
        if(subjects) {
            return subjects.map( subject => {
                return (
                    <option key={subject.id} value={subject.id}>{subject.title}</option>
                );
            });
        }
    }

    render() {
        return (
            <Row>
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <ControlLabel>Speciality</ControlLabel>
                            <FormControl
                                componentClass="select"
                                onChange={this.handleSpecialitySelect}
                            >
                                <option value=''></option>
                                { this.renderSpecialitiesList() }
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                    {
                        this.specialityId ?
                        <FormGroup>
                            <ControlLabel>Exam</ControlLabel>
                            <FormControl
                                componentClass="select"
                                onChange={this.handleExamsSelect}
                                disabled={!this.specialityId}
                                >
                                    <option value=''></option>
                                    { this.renderExamsList() }
                                </FormControl>
                        </FormGroup>
                        :
                        null
                    }
                    </Col>
                    <Col md={3}>
                        {
                            this.examId ?
                            <FormGroup>
                                <ControlLabel>Type</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    onChange={this.handleTypeSelect}
                                    disabled={!this.examId}
                                    >
                                        <option value=''></option>
                                        <option value='EXAM'>EXAM</option>
                                        <option value='TESTING'>TESTING</option>
                                    </FormControl>
                                </FormGroup> :
                                null
                        }
                    </Col>
                    <Col md={3}>
                        {
                            this.type === 'TESTING' ?
                            <FormGroup>
                                <ControlLabel>Subject</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    onChange={this.handleSubjectSelect}
                                    disabled={this.type !== 'TESTING'}
                                    >
                                        <option value=''></option>
                                        { this.renderSubjectsList() }
                                    </FormControl>
                            </FormGroup> :
                            null
                        }
                    </Col>
                </Row>
                {
                    this.examId && this.specialityId && (this.type === 'EXAM' || this.subjectId) ?
                    <Button
                        bsStyle="primary"
                        className='col-centered'
                        onClick={this.handleStart}
                        disabled={!(this.examId && this.specialityId && (this.type === 'EXAM' || this.subjectId))}
                        >
                            Start
                    </Button> :
                    null
                }
            </Row>
        );
    }
}

export default TestingPage
