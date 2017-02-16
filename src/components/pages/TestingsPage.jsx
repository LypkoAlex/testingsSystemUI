import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { Link }              from 'react-router';
import { observable }  from 'mobx';
import {  Row, Modal, Button, FormControl, ControlLabel, FormGroup, Col, InputGroup, ButtonToolbar } from 'react-bootstrap';
import Spiner           from '../widgets/Spiner';
import { find } from 'lodash';


@inject('specialitiesStore', 'examsStore', 'subjectStore', 'testStore') @observer

class TestingPage extends Component {
    @observable examId;
    @observable type;
    @observable specialityId;
    @observable questionCount;
    @observable subjectId;
    @observable isShowModal = false;

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

    modalAction = () => {
        this.isShowModal = !this.isShowModal;
    }

    handleStart = async () => {
        const { testStore } = this.props;
        await testStore.createTest(this.examId, {
            speciality : this.specialityId,
            subject    : this.subjectId,
            type       : this.type
        });
        console.log('test', testStore.test);
        this.questionCount = testStore.test.questions.length;
        this.modalAction();
        // browserHistory.push(`/test/${test.id}`)
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
        const { exams } = this.props.examsStore;
        const { isLoading, specialities } = this.props.specialitiesStore;
        const { subjects } = this.props.subjectStore;
        const { test } = this.props.testStore;
        const testLoading = this.props.testStore.isLoading;
        return (
            <div className='reletiveBlock'>
                {
                    isLoading || testLoading ?
                        <Spiner />
                    : null
                }
                <Row>
                    {
                        this.isShowModal ?
                        <Modal show={this.isShowModal} onHide={this.modalAction}>
                            <Modal.Header closeButton>
                                <div className='titleHeader'>
                                    <span className='modalTitle'>
                                        {find(specialities, { id : this.specialityId }).title}
                                    </span>
                                    <span className='modalTitle'>
                                        { this.subjectId ?
                                            find(subjects, { id : this.subjectId }).title
                                            :
                                            find(exams, { id : this.examId }).title
                                        }
                                    </span>
                                </div>
                            </Modal.Header>
                            <Modal.Body>
                                <p className='alignCenter modalBody'>Question in topic : {this.questionCount}<br/><br/>
                                اللَّهُمَّ لا سَهْلَ إِلاَّ ما جَعَلْتَهُ سَهْلاً، وأنْتَ تَجْعَلُ الحَزْنَ إذَا شِئْتَ سَهْلاً
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Link className='btn btn-default' href={'/test/' + test.id}>Let's go</Link>
                            </Modal.Footer>
                        </Modal>
                        : null
                    }
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
                            this.specialityId && exams ?
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
                                            <option value='EXAM'>Exam mode</option>
                                            <option value='TESTING'>Study mode</option>
                                        </FormControl>
                                    </FormGroup> :
                                    null
                            }
                        </Col>
                        <Col md={3}>
                            {
                                this.type === 'TESTING' && subjects ?
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
            </div>
        );
    }
}

export default TestingPage
