import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

// import CSSModules from 'react-css-modules';
// import styles     from './QuestionTable.less';
@inject('specialitiesStore', 'subjectStore', 'examsStore')
// @CSSModules(styles)
export default @observer class QuestionsTable extends Component {
    static propTypes = {
        viewStore     : MobxTypes.observableObject,
        questionsStore: MobxTypes.observableObject,
        searchQuery   : PropTypes.string,
        questions     : PropTypes.object
    };

    @observable editIndex;
    @observable editedValue = {};
    handleClickEdit = (index) => {
        this.editIndex = index;
    }

    handleChange = (index, e) => {
        this.editedValue[index] = e.target.value;
        console.log(this.editedValue);
        this.forceUpdate(); // запитати як забрати !!!!!!!!!!!
    }

    handleClickSave = async (index, id) => {
        const { exam, updateExam } = this.props.examsStore;
        console.log(id, this.editedValue[index]);
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
        console.log(subjects);
        await updateExam(exam.id, { subjects });
        this.editIndex = -1;
    }
    handleClickDelete = async (id) => {
        const { exam, updateExam } = this.props.examsStore;
        console.log('id', id);
        const subjects = exam.subjects.filter(item => item.subject._id !== id);
        await updateExam(exam.id, { subjects });
        console.log(exam.subjects);
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
                console.log('SUBJECT', subject);
            return (
                <tr key={subject.subject._id}>
                    <th scope='row'>{i}</th>
                    <td>
                        { subject.subject.title } { subject.subject.questions.length }
                    </td>
                    <td>
                        <input
                            disabled     = { i === this.editIndex ? false : true}
                            onChange     = {this.handleChange.bind(this, i)}
                            type         = 'number'
                            defaultValue = {subject.count}
                        >
                        </input>
                    </td>
                    <td>
                        {
                            i === this.editIndex
                            ?
                            <button
                                onClick  = {this.handleClickSave.bind(this, i, subject.subject._id)}
                                disabled = { this.editedValue[i] ? false : true}
                            >
                                Save
                            </button>
                            :
                            <button onClick={this.handleClickEdit.bind(this, i)}>Edit</button>
                        }
                        <button onClick={this.handleClickDelete.bind(this, subject.subject._id)}>Delete</button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        const { exam } = this.props.examsStore;
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Subject Name</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {   exam.subjects ?
                        this.renderExamSubjectList() :
                        null
                    }
                </tbody>
            </table>
        );
    }
}
