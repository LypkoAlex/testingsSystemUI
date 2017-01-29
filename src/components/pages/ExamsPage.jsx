import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

import CSSModules               from 'react-css-modules';
import styles                   from './ExamsPage.css';
import ExamsList from '../widgets/ExamsList.jsx';
@inject('examsStore', 'specialitiesStore') @observer @CSSModules(styles)
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

    handleCreateExam = async () => {
        const { createExam } = this.props.examsStore;
        await createExam(this.speciality, { title : this.examName });
    }

    render() {
        const { exams } = this.props.examsStore;
        return (
            <div styleName='ExamsPage'>
                <input
                    onChange={this.handleChangeName}
                    defaultValue={this.examName}>
                </input>
                <select
                    onChange={this.handleChangeSpeciality}
                >
                    {this.renderSpecialitiesList()}
                </select>
                <button onClick={this.handleCreateExam}>Add</button>
                <ExamsList
                    exams = {exams}
                />
            </div>
        );
    }
}
