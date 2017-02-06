import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col, Table, ButtonToolbar, Panel } from 'react-bootstrap';

@inject('specialitiesStore', 'subjectStore', 'examsStore')
export default @observer class QuestionsTable extends Component {
    static propTypes = {
        questionsStore: MobxTypes.observableObject,
        searchQuery   : PropTypes.string,
        questions     : PropTypes.object
    };

    @observable editIndex;
    @observable editedValue = {};
    handleClickEdit = (index, val) => {
        this.editIndex = index;
        this.editedValue[index] = val;
    }

    handleChange = (index, e) => {
        this.editedValue[index] = e.target.value;
    }

    handleClickSave = async (index, id) => {
        const { exam, updateExam } = this.props.examsStore;
        const subjects = exam.subjects.map(item => {
            if(item.subject._id === id) {
                return {
                    subject : item.subject._id,
                    count   : this.editedValue[index]
                }
            }
            return {
                subject : item.subject._id,
                count : item.count
            };
        });
        await updateExam(exam.id, { subjects });
        this.editIndex = -1;
    }
    handleClickDelete = async (id) => {
        const { exam, updateExam } = this.props.examsStore;
        const subjects = exam.subjects.filter(item => item.subject._id !== id);
        await updateExam(exam.id, { subjects });
    }

    renderSpecialitiesList = () => {
        const { specialities } = this.props.specialitiesStore;
        return specialities.map( speciality => {
            return (
                <option key={speciality.id} value={speciality.id}>{speciality.title}</option>
            );
        });
    }

    renderExamSubjectList() {
        const { exam } = this.props.examsStore;

        return exam.subjects
            .map((subject, i) => {
            return (
                <tr key={i}>
                    <th scope='row'>{i}</th>
                    <td>
                        { subject.subject.title } { subject.subject.questions.length }
                    </td>
                    <td>
                        <FormControl
                            disabled     = { i === this.editIndex ? false : true}
                            onChange     = {this.handleChange.bind(this, i)}
                            type         = 'number'
                            defaultValue = {subject.count}
                        >
                        </FormControl>
                    </td>
                    <td>
                        <ButtonToolbar>
                            {
                                i === this.editIndex
                                ?
                                <Button
                                    onClick  = {this.handleClickSave.bind(this, i, subject.subject._id)}
                                    disabled = { this.editedValue[i] ? false : true}
                                >
                                    Save
                                </Button>
                                :
                                <Button onClick={this.handleClickEdit.bind(this, i, subject.count)}>Edit</Button>
                            }
                            <Button onClick={this.handleClickDelete.bind(this, subject.subject._id)}>Delete</Button>
                        </ButtonToolbar>
                    </td>
                </tr>
            );
        });
    }

    render() {
        const { exam } = this.props.examsStore;
        return (
            <Row  className='listItems'>
                <Panel>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Subject Name</th>
                                <th>Count</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {   exam.subjects ?
                                this.renderExamSubjectList() :
                                null
                            }
                        </tbody>
                    </Table>
                </Panel>
            </Row>
        );
    }
}
