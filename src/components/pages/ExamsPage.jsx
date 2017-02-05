import React, { Component, PropTypes }                             from 'react';
import { observer, inject, propTypes as MobxTypes }                from 'mobx-react';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col } from 'react-bootstrap';
import { observable } from 'mobx';
import Spiner         from '../widgets/Spiner';
import ExamsList      from '../widgets/ExamsList.jsx';

@inject('examsStore', 'specialitiesStore') @observer
export default class ExamsPage extends Component {
    @observable speciality;
    @observable examName;

    static propTypes = {
        examsStore        : MobxTypes.observableObject,
        specialitiesStore : MobxTypes.observableObject
    };

    async componentWillMount () {
        const { fetchExams } = this.props.examsStore;
        const { fetchSpecialities } = this.props.specialitiesStore;
        await fetchExams();
        await fetchSpecialities();
    }

    renderSpecialitiesList = () => {
        const { specialities } = this.props.specialitiesStore;
        return specialities.map( speciality => {
            return (
                <option key={speciality.id} value={speciality.id}>{speciality.title}</option>
            );
        });
    }

    handleChangeSpeciality = (e) => {
        this.speciality = e.target.value;
    }

    handleChangeName = (e) => {
        this.examName = e.target.value;
    }

    handleCreateExam = () => {
        const { createExam } = this.props.examsStore;
        createExam(this.speciality, { title : this.examName });
        this.speciality = '';
        this.examName = '';
    }

    render() {
        const { exams, isLoading } = this.props.examsStore;
        return (
            <div className='reletiveBlock'>
                {
                    isLoading ?
                        <Spiner />
                    : null
                }
                <Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup controlId="formControlsSelect">
                                <FormControl
                                    componentClass="select"
                                    placeholder="select"
                                    onChange={this.handleChangeSpeciality}
                                    value={this.speciality}
                                >
                                    <option value=''>Specialities</option>
                                    {this.renderSpecialitiesList()}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <FormControl
                                    onChange={this.handleChangeName}
                                    value={this.examName}
                                    placeholder='Exam title'>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <Button
                                onClick={this.handleCreateExam}
                                disabled={ !(this.examName && this.speciality) }
                            >Add</Button>
                        </Col>
                    </Row>
                        <ExamsList
                            exams = {exams}
                        />
                </Row>
            </div>
        );
    }
}
