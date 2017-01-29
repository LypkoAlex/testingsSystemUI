import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

import CSSModules               from 'react-css-modules';
import styles                   from './EditExamPage.css';
import ExamSubjectsList from '../widgets/ExamSubjectsList.jsx';
@inject('examsStore', 'specialitiesStore', 'subjectStore') @observer @CSSModules(styles)
export default class ExamsPage extends Component {
    @observable subject;
    @observable count;

    static propTypes = {
        examsStore        : MobxTypes.observableObject,
        specialitiesStore : MobxTypes.observableObject
    };

    async componentWillMount () {
        const { fetchExams } = this.props.examsStore;
        const { fetchSubjects } = this.props.subjectStore;
        const { fetchSpecialities } = this.props.specialitiesStore;
        const { fetchExam, exam } = this.props.examsStore;
        await fetchExams();
        await fetchSubjects();
        await fetchSpecialities();
        this.examId = this.props.location.pathname.replace('/admin/exams/', '');
        await fetchExam(this.examId);
        console.log('exam', exam);
    }

    handleAddSubject = () => {
        const { updateExam, exam } = this.props.examsStore;
        const subjects = JSON.parse(JSON.stringify(exam.subjects));
        subjects.push({ subject : this.subject, count : this.count });
        updateExam(this.examId, { subjects })
        console.log(this.subject, this.count, this.examId);
    }

    handleChangeSubject = (e) => {
        this.subject = e.target.value;
    }

    handleChangeCount = (e) => {
        this.count = e.target.value;
    }

    renderSubjectsList = () => {
        const { subjects } = this.props.subjectStore;
        if(subjects) {
            return subjects.map( subject => {
                return (
                    <option key={subject.id} value={subject.id}>{subject.title} {subject.questions.length}</option>
                );
            });
        }
    }

    render() {
        const { exam } = this.props.examsStore;
        console.log(exam);
        return (
            <div styleName='ExamsPage'>
                <select
                    onChange={this.handleChangeSubject}
                >
                    {this.renderSubjectsList()}
                </select>
                <input
                    type='number'
                    onChange={this.handleChangeCount}
                    defaultValue={this.count}
                >
                </input>
                <button onClick={this.handleAddSubject}>Add</button>
                <ExamSubjectsList/>
            </div>
        );
    }
}
