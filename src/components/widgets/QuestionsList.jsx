import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';
import { browserHistory } from 'react-router';

// import CSSModules from 'react-css-modules';
// import styles     from './QuestionTable.less';
@inject('specialitiesStore')
// @CSSModules(styles)
export default @observer class QuestionsTable extends Component {
    static propTypes = {
        viewStore     : MobxTypes.observableObject,
        questionsStore: MobxTypes.observableObject,
        searchQuery   : PropTypes.string,
        questions     : PropTypes.object
    };

    handleClickEditQuestion = (id) => {
        browserHistory.push(`/admin/questions/${id}`);
    }

    renderQuestionsList() {
        const { questions } = this.props;
        console.log(questions);
        return questions
            .map((question, i) => {
            return (
                <tr
                    key={i}
                >
                    <th scope='row'>{i}</th>
                    <td>
                        {question.text}
                    </td>
                    <td>
                        {question.subject.title}
                    </td>
                    <td>
                        <button onClick={this.handleClickEditQuestion.bind(this, question.id)}>Edit</button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Text</th>
                        <th>Subject</th>
                    </tr>
                </thead>
                <tbody>
                    { this.renderQuestionsList() }
                </tbody>
            </table>
        );
    }
}
