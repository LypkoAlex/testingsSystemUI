import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

import CSSModules   from 'react-css-modules';
import styles       from './SubjectPage.css';
import SubjectsList from '../widgets/SubjectsList.jsx'

@inject('subjectStore', 'specialitiesStore') @observer @CSSModules(styles)
export default class SubjectPage extends Component {
    @observable subjectName;
    @observable filter;
    @observable speciality;
    static propTypes = {
        viewStore: MobxTypes.observableObject
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

    handleCreateSubject = async () => {
        const { createSubject } = this.props.subjectStore;
        await createSubject(this.speciality, this.subjectName);
        this.speciality  = '';
        this.subjectName = '';
        this.forceUpdate();
    }

    handleChangeSpecialityFilter = (e) => {
        console.log(e.target.value);
        this.filter = e.target.value;
        this.forceUpdate();
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

    render() {
        const { subjects } = this.props.subjectStore;
        return (
            <div styleName='SubjectPage'>
                <select
                    onChange={this.handleChangeSpecialityFilter}
                    >
                        <option value=''>All</option>
                        {this.renderSpecialitiesList()}
                </select>
                <input
                    onChange={this.handleChangeSubjectName}
                    defaultValue={this.subjectName}>
                </input>
                <select
                    onChange={this.handleChangeSpeciality}
                >
                    {this.renderSpecialitiesList()}
                </select>
                <button onClick={this.handleCreateSubject}>Add</button>
                <SubjectsList
                    subjects = {subjects}
                    filter   = {this.filter}
                />
            </div>
        );
    }
}
