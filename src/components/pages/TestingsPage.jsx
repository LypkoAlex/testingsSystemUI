import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { browserHistory }              from 'react-router';
import { observable }  from 'mobx';

@inject('viewStore', 'specialitiesStore', 'examsStore', 'subjectStore', 'testStore') @observer

class TestingPage extends Component {
    static propTypes = {
        viewStore        : MobxTypes.observableObject,
        specialitiesStore: MobxTypes.observableObject,
        subjectsStore    : MobxTypes.observableObject,
        testStore    : MobxTypes.observableObject,
        examsStore       : MobxTypes.observableObject
    };
    async componentWillMount() {
        console.log(this.props);
        const { specialitiesStore } = this.props;
        console.log('specialitiesStore', specialitiesStore);
        await specialitiesStore.fetchSpecialities();
    }

    handleStart = async () => {
        const { testStore } = this.props;
        console.log({
            speciality : this.specialityId,
            subject    : this.subjectId,
            type       : this.type
        });
        const test = await testStore.createTest(this.examId, {
            speciality : this.specialityId,
            subject    : this.subjectId,
            type       : this.type
        });
        console.log('test', test);
        browserHistory.push(`/test/${test.id}`)
    }

    handleSpecialitySelect = async (e) => {
        const { examsStore } = this.props;
        this.specialityId = e.target.value;
        await examsStore.fetchExamsById(e.target.value);
    }

    handleTypeSelect = async (e) => {
        const { subjectStore } = this.props;
        this.type = e.target.value;
        if (e.target.value === 'TESTING') {
            subjectStore.fetchSubjectsBySpeciality(this.specialityId);
        }
    }

    handleExamsSelect = async (e) => {
        this.examId = e.target.value;
    }

    handleSubjectSelect = async (e) => {
        this.subjectId = e.target.value;
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

    renderExamsList = () => {
        const { exams } = this.props.examsStore;
        if(exams) {
            return exams.map( exam => {
                return (
                    <option key={exam.id} value={exam.id}>{exam.title}</option>
                );
            });
        }
    }

    renderSubjectsList = () => {
        const { subjects } = this.props.subjectStore;
        if(subjects) {
            return subjects.map( subject => {
                return (
                    <option key={subject.id} value={subject.id}>{subject.title}</option>
                );
            });
        }
    }

    render() {
        return (
            <div className='row'>
                <select
                    onChange={this.handleSpecialitySelect}
                >
                    { this.renderSpecialitiesList() }
                </select>
                <select
                    onChange={this.handleExamsSelect}
                >
                    { this.renderExamsList() }
                </select>
                <select
                    onChange={this.handleTypeSelect}
                >
                    <option value='EXAM'>EXAM</option>
                    <option value='TESTING'>TESTING</option>
                </select>
                <select
                    onChange={this.handleSubjectSelect}
                >
                    { this.renderSubjectsList() }
                </select>
                <button onClick={this.handleStart}>
                    Start
                </button>
            </div>
        );
    }
}

export default TestingPage
