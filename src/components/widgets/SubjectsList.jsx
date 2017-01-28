import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

// import CSSModules from 'react-css-modules';
// import styles     from './QuestionTable.less';
@inject('specialitiesStore', 'subjectStore')
// @CSSModules(styles)
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
    handleClickEdit = (index) => {
        this.editIndex = index;
    }

    handleChange = (index, e) => {
        this.editedValue[index] = e.target.value;
        this.forceUpdate(); // запитати як забрати !!!!!!!!!!!
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
                        <input
                            type='text'
                            disabled={ i === this.editIndex ? false : true}
                            defaultValue={subject.title}
                            onChange = {this.handleChange.bind(this, i)}
                        >
                        </input>
                    </td>
                    <td>
                        <select
                            disabled={ i === this.editIndex ? false : true}
                            onChange={this.handleChangeSpeciality.bind(this, i)}
                            defaultValue = {subject.speciality.id}
                        >
                            {this.renderSpecialitiesList()}
                        </select>
                    </td>
                    <td>
                        {
                            i === this.editIndex
                            ?
                            <button
                                onClick={this.handleClickSave.bind(this, i, subject.id)}
                                disabled= { this.editedValue[i] || this.editedSpecialityValue[i] ? false : true}
                            >
                                Save
                            </button>
                            :
                            <button onClick={this.handleClickEdit.bind(this, i)}>Edit</button>
                        }
                        <button onClick={this.handleClickDelete.bind(this, subject.id)}>Delete</button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        const { questions } = this.props;

        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Specialty Name</th>
                    </tr>
                </thead>
                <tbody>
                    { this.renderSubjectList() }
                </tbody>
            </table>
        );
    }
}
