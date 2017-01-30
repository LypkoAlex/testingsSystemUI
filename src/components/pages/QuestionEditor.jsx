import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

@inject('questionsStore', 'subjectStore') @observer
export default class QuestionEditor extends Component {
    @observable answers = [];
    @observable subject;
    @observable text;
    @observable answerIndex;

    static propTypes = {
        questionsStore : MobxTypes.observableObject,
        subjectStore   : MobxTypes.observableObject
    };

    async componentWillMount() {
        const { fetchSubjects } = this.props.subjectStore;
        const { fetchQuestions, fetchQuestion, question} = this.props.questionsStore;
        this.questionId = this.props.location.pathname.replace('/admin/questions/', '');
        await fetchSubjects();
        await fetchQuestion(this.questionId);
    }

    handleChangeText = async (e) => {
        this.text = e.target.value;
    }

    handleClickSave = async () => {
        const { createQuestion } = this.props.questionsStore;
        await createQuestion(this.subject, {
            answers : this.answers,
            text : this.text,
            answerIndex : this.answerIndex
        })
    }

    handleChangeAnswerIndex = (e) => {
        this.answerIndex = e.target.value;
    }

    handleChangeSubject = (e) => {
        this.subject = e.target.value;
    }

    handleChangeAnswer = (index, e) => {
        this.answers[index] = e.target.value;
    }

    renderSubjectsList = () => {
        const { subjects } = this.props.subjectStore;
        return subjects.map( subject => {
            return (
                <option key={subject.id} value={subject.id}>{subject.title}</option>
            );
        });
    }

    renderAnswersList = (count) => {
        const { question } = this.props.questionsStore;
        console.log('OBJEsdadf', question);
        const arr = [];
        for(let i = 0; i < count; i++) {
            arr.push(
                <div key={i}>
                    <textarea rows="1" cols="45" placeholder='answer' name="text"
                        onChange = {this.handleChangeAnswer.bind(this, i)}
                        value={question.answers ? question.answers[i] : ''}
                    ></textarea>
                    <input type="radio" name="answers" value={i} onChange={this.handleChangeAnswerIndex}/>
                </div>
            )
        }
        return arr;
    }

    render() {
        return (
            <div>
                <div>
                    <select
                        onChange={this.handleChangeSubject}
                    >
                        {this.renderSubjectsList()}
                    </select>
                </div>
                <div>
                    <textarea onChange={this.handleChangeText} rows="5" cols="45" name="text"></textarea>
                </div>
                {this.renderAnswersList(6)}
                <button onClick={this.handleClickSave}>Save</button>
            </div>
        );
    }
}
