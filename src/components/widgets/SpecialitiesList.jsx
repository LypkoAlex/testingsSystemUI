import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';
import {  Table, Button, FormControl, ButtonToolbar } from 'react-bootstrap'
@inject('specialitiesStore')
export default @observer class QuestionsTable extends Component {
    static propTypes = {
        viewStore     : MobxTypes.observableObject,
        questionsStore: MobxTypes.observableObject,
        searchQuery   : PropTypes.string,
        questions     : PropTypes.object
    };

    @observable editIndex = '';
    @observable editedValue = {};
    handleClickEdit = (index, val) => {
        this.editIndex = index;
        this.editedValue[index] = val;
    }

    handleChange = (index, e) => {
        this.editedValue[index] = e.target.value;
    }

    handleClickSave = async (index, id) => {
        const { updateSpeciality } = this.props.specialitiesStore;
        await updateSpeciality(id, { title : this.editedValue[index]});
        this.editIndex = -1;
    }
    handleClickDelete = async (id) => {
        console.log(id);
        const { deleteSpeciality } = this.props.specialitiesStore;
        await deleteSpeciality(id);
    }

    renderSpecialitiesList() {
        const { specialities } = this.props;

        return specialities
            .map((speciality, i) => {
            return (
                <tr
                    key={speciality.id}
                >
                    <th scope='row'>{i}</th>
                    <td>
                        <FormControl
                            type='text'
                            disabled={ i === this.editIndex ? false : true}
                            defaultValue={speciality.title}
                            onChange = {this.handleChange.bind(this, i)}
                        >
                        </FormControl>
                    </td>
                    <td>
                        <ButtonToolbar>
                            {
                                i === this.editIndex
                                ?
                                <Button
                                    onClick={this.handleClickSave.bind(this, i, speciality.id)}
                                >Save</Button>
                                :
                                <Button onClick={this.handleClickEdit.bind(this, i, speciality.title)}>Edit</Button>
                            }
                            <Button onClick={this.handleClickDelete.bind(this, speciality.id)}>Delete</Button>
                        </ButtonToolbar>
                    </td>
                </tr>
            );
        });
    }

    render() {
        const { questions } = this.props;

        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Specialty Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { this.renderSpecialitiesList() }
                </tbody>
            </Table>
        );
    }
}
