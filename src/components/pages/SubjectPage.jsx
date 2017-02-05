import React, { Component, PropTypes }                             from 'react';
import { observer, inject, propTypes as MobxTypes }                from 'mobx-react';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col } from 'react-bootstrap';
import { observable } from 'mobx';
import Spiner         from '../widgets/Spiner';
import SubjectsList   from '../widgets/SubjectsList.jsx';

@inject('subjectStore', 'specialitiesStore') @observer
export default class SubjectPage extends Component {
    @observable subjectName ='';
    @observable filter;
    @observable speciality;
    static propTypes = {
        subjectStore: MobxTypes.observableObject
    };

    async componentWillMount () {
        const { fetchSpecialities } = this.props.specialitiesStore;
        const { fetchSubjects } = this.props.subjectStore;
        await fetchSpecialities();
        await fetchSubjects();
    }

    handleChangeSubjectName = (e) => {
        this.subjectName = e.target.value;
    }

    handleChangeSpeciality = (e) => {
        this.speciality = e.target.value;
    }

    handleCreateSubject = () => {
        const { createSubject } = this.props.subjectStore;
        createSubject(this.speciality, this.subjectName);
        this.speciality  = '';
        this.subjectName = '';
    }

    handleChangeSpecialityFilter = (e) => {
        this.filter = e.target.value;
    }

    renderSpecialitiesList = () => {
        const { specialities } = this.props.specialitiesStore;
        return specialities.map( speciality => {
            console.log(speciality.title);
            return (
                <option key={speciality.id} value={speciality.id}>{speciality.title}</option>
            );
        });
    }

    render() {
        const { subjects, isLoading } = this.props.subjectStore;
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
                                    onChange={this.handleChangeSubjectName}
                                    value={this.subjectName}
                                    placeholder='Subject title'>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <Button
                                onClick={this.handleCreateSubject}
                                disabled={ !(this.subjectName && this.speciality) }
                            >Add</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} mdOffset={8}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Filter by speciality</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    placeholder="select"
                                    onChange={this.handleChangeSpecialityFilter}
                                >
                                    <option value=''>All</option>
                                    {this.renderSpecialitiesList()}
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                        <SubjectsList
                            subjects = {subjects}
                            filter   = {this.filter}
                        />
                </Row>
            </div>
        );
    }
}
