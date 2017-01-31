import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col, Table, ButtonToolbar } from 'react-bootstrap'
import { observable } from 'mobx';

@inject('specialitiesStore', 'subjectStore')
export default @observer class QuestionsTable extends Component {
    static propTypes = {
        viewStore     : MobxTypes.observableObject,
        questionsStore: MobxTypes.observableObject,
        searchQuery   : PropTypes.string,
        questions     : PropTypes.object
    };

    @observable editIndex = '';
    @observable editedValue = {};
    @observable editedSpecialityValue = {};
    handleClickEdit = (index, val) => {
        this.editIndex = index;
        this.editedValue[index] = val;
    }

    handleChange = (index, e) => {
        this.editedValue[index] = e.target.value;
    }

    handleClickSave = async (index, id) => {
        const { updateSubject } = this.props.subjectStore;
        const updatedObj = {};
        if(this.editedValue[index]) updatedObj.title = this.editedValue[index];
        if(this.editedSpecialityValue[index]) updatedObj.speciality = this.editedSpecialityValue[index];
        await updateSubject(id, updatedObj);
        this.editIndex = -1;
    }
    handleClickDelete = async (id) => {
        const { deleteSubject } = this.props.subjectStore;
        await deleteSubject(id);
    }

    renderSpecialitiesList = () => {
        const { specialities } = this.props.specialitiesStore;
        return specialities.map( speciality => {
            return (
                <option key={speciality.id} value={speciality.id}>{speciality.title}</option>
            );
        });
    }

    handleChangeSpeciality = (index, e) => {
        this.editedSpecialityValue[index] = e.target.value;
    }

    renderSubjectList() {
        const { subjects } = this.props;

        return subjects
            .filter(subject => this.props.filter ? subject.speciality.id === this.props.filter : true)
            .map((subject, i) => {
            return (
                <tr
                    key={subject.id}
                >
                    <th scope='row'>{i}</th>
                    <td>
                        <FormControl
                            type='text'
                            disabled={ i === this.editIndex ? false : true}
                            defaultValue={subject.title}
                            onChange = {this.handleChange.bind(this, i)}
                        >
                        </FormControl>
                    </td>
                    <td>
                        <FormControl
                            disabled={ i === this.editIndex ? false : true}
                            componentClass='select'
                            onChange={this.handleChangeSpeciality.bind(this, i)}
                            defaultValue = {subject.speciality.id}
                        >
                            {this.renderSpecialitiesList()}
                        </FormControl>
                    </td>
                    <td>
                        <ButtonToolbar>
                            {
                                i === this.editIndex
                                ?
                                <Button
                                    onClick={this.handleClickSave.bind(this, i, subject.id)}
                                    disabled= { this.editedValue[i] || this.editedSpecialityValue[i] ? false : true}
                                >
                                    Save
                                </Button>
                                :
                                <Button onClick={this.handleClickEdit.bind(this, i, subject.title)}>Edit</Button>
                            }
                            <Button onClick={this.handleClickDelete.bind(this, subject.id)}>Delete</Button>
                        </ButtonToolbar>
                    </td>
                </tr>
            );
        });
    }

    render() {
        const { questions } = this.props;

        return (
            <Col md={12}>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Subject Name</th>
                            <th>Specialty</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderSubjectList() }
                    </tbody>
                </Table>
            </Col>
        );
    }
}
