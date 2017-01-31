import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col, Table, ButtonToolbar, Panel } from 'react-bootstrap'
import { observable } from 'mobx';
import { browserHistory } from 'react-router'

@inject('specialitiesStore', 'examsStore')
export default @observer class QuestionsTable extends Component {
    static propTypes = {
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
        const { updateExam } = this.props.examsStore;
        const updatedObj = {};
        if(this.editedValue[index]) updatedObj.title = this.editedValue[index];
        if(this.editedSpecialityValue[index]) updatedObj.speciality = this.editedSpecialityValue[index];
        await updateExam(id, updatedObj);
        this.editIndex = -1;
    }
    handleClickDelete = async (id) => {
        const { deleteExam } = this.props.examsStore;
        await deleteExam(id);
    }

    handleAddSubject = (id) => {
        browserHistory.push(`/admin/exams/${id}`);
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

    renderExamsList() {
        const { exams } = this.props;
        return exams
            .map((exam, i) => {
                console.log('exam', exam);
            return (
                <tr
                    key={exam.id}
                >
                    <th scope='row'>{i}</th>
                    <td>
                        <FormControl
                            type='text'
                            disabled={ i === this.editIndex ? false : true}
                            defaultValue={exam.title}
                            onChange = {this.handleChange.bind(this, i)}
                        >
                        </FormControl>
                    </td>
                    <td>
                        <FormControl
                            componentClass="select"
                            disabled={ i === this.editIndex ? false : true}
                            onChange={this.handleChangeSpeciality.bind(this, i)}
                            defaultValue = {exam.speciality.id}
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
                                    onClick  = {this.handleClickSave.bind(this, i, exam.id)}
                                >
                                    Save
                                </Button>
                                :
                                <Button onClick={this.handleClickEdit.bind(this, i, exam.title)}>Edit</Button>
                            }
                            <Button onClick={this.handleAddSubject.bind(this, exam.id)}>Add Subject</Button>
                            <Button onClick={this.handleClickDelete.bind(this, exam.id)}>Delete</Button>
                        </ButtonToolbar>
                    </td>
                </tr>
            );
        });
    }

    render() {
        const { questions } = this.props;
        console.log(this.editedValue);
        return (
            <Row  className='listItems'>
                <Panel>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Exam Name</th>
                                <th>Specialty</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderExamsList() }
                        </tbody>
                    </Table>
                </Panel>
            </Row>
        );
    }
}
