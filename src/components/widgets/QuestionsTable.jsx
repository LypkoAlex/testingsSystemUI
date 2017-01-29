import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

import CSSModules from 'react-css-modules';
import styles     from './QuestionTable.css';

@inject('viewStore', 'questionsStore') @observer @CSSModules(styles)
export default class QuestionsTable extends Component {
    static propTypes = {
        viewStore     : MobxTypes.observableObject,
        questionsStore: MobxTypes.observableObject,
        searchQuery   : PropTypes.string,
        questions     : PropTypes.object
    };

    componentWillMount() {
        this.renderQuestionsList();
    }

    handleEditQuestion = id => {
        const { viewStore, questionsStore } = this.props;

        questionsStore.setCurrentQuestion(id);
        viewStore.setCurrentPage('edit');
    }

    renderQuestionsList() {
        const { questions, searchQuery } = this.props;

        return questions
            .filter(question => searchQuery ? question.text && question.text.includes(searchQuery) : true)
            .map((question, i) => {
            return (
                <tr
                    key={question.id}
                >
                    <th scope='row'>{i}</th>
                    <td>{question.text}</td>
                    <td>{question.subject.title}</td>
                    <td
                        onTouchTap={this.handleEditQuestion.bind(this, question.id)}
                        styleName='edit'
                    >
                        Edit
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
                        <th>Subject</th>
                        <th>Answers</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderQuestionsList()}
                </tbody>
            </table>
        );
    }
}
