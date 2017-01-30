import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

import CSSModules from 'react-css-modules';
import styles     from './TestPage.css';

@inject('viewStore', 'testStore') @observer @CSSModules(styles)
export default class TestPage extends Component {
    static propTypes = {
        viewStore : MobxTypes.observableObject,
        testStore : MobxTypes.observableObject
    };
    async componentWillMount() {
        const { testStore } = this.props;
        this.testId = this.props.location.pathname.replace('/test/', '');
        await testStore.getQuestion(this.testId);
        console.log('question', testStore.question);
        this.selectedAnswer = [];
    }

    handleSaveTest = async () => {

    }

    handleNextQuestion = async () => {
        const { question, checkAnswer, getQuestion } = this.props.testStore;
        await checkAnswer({
            question : question.id,
            answer : this.answer
        }, this.testId);
        await getQuestion(this.testId);
    }

    handleSelectAnswer = async (index) => {
        const { question, checkAnswer, getQuestion } = this.props.testStore;
        this.answer = index;
        if (question.testType === 'EXAM') {
            await checkAnswer({
                question : question.id,
                answer : index
            }, this.testId);
            await getQuestion(this.testId);
        }
    }

    renderAnswerList = () => {
        const { question } = this.props.testStore;
        const answerIndex = question.answerIndex || undefined;
        return (
            question.answers.map((item, index) => {
                return (
                    <div
                        key = {index}
                        className = {
                            index === answerIndex
                            ?
                            'true'
                            :
                            null
                        }>
                        <label >
                            <input
                                onClick = {this.handleSelectAnswer.bind(this, index)}
                                type    ="radio" name="optradio"
                            >
                            </input>
                            { item }
                        </label>
                    </div>
                );
            })
        );
    }

    render() {
        const { question } = this.props.testStore;
        return (
            <div styleName='TestPage'>
                {
                    question.code ?
                    <div>
                        Test completed <br/>
                        Your result: { question.test.result }%
                    </div>
                    :
                    <div>
                        <button onClick={this.handleSaveTest}>Save</button>
                        {question.text}
                        {question.answers ? this.renderAnswerList() : null}
                        {
                            question.testType === 'TESTING' ?
                            <button onClick={this.handleNextQuestion}>NEXT</button>
                            :
                            null
                        }
                    </div>
                }
            </div>
        );
    }
}
