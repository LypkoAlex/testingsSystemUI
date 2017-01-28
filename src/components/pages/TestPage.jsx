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
        this.selectedAnswer = [];
    }

    handleSelectAnswer = async (index) => {
        const { question, checkAnswer, getQuestion } = this.props.testStore;
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
        console.log(question);
        return (
            <div styleName='TestPage'>
                {question.text}
                {question.answers ? this.renderAnswerList() : null}
            </div>
        );
    }
}
