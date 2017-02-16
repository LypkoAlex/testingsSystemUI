import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import {  Row, Button, FormControl, ControlLabel, FormGroup, Col, Table, ButtonToolbar, Panel } from 'react-bootstrap';
import { observable } from 'mobx';
import { browserHistory } from 'react-router';
import { find } from 'lodash';

@inject('specialitiesStore', 'questionsStore', 'subjectStore')
export default @observer class QuestionsTable extends Component {
    static propTypes = {
        questionsStore: MobxTypes.observableObject,
        searchQuery   : PropTypes.string,
        questions     : PropTypes.object
    };

    handleClickEditQuestion = (id) => {
        browserHistory.push(`/admin/questions/${id}`);
    }

    handleClickDeleteQuestion = async (id) => {
        const { deleteQuestion } = this.props.questionsStore;
        await deleteQuestion(id);
    }

    renderQuestionsList() {
        const { questions, searchQuery, subject } = this.props;
        const { subjects } = this.props.subjectStore;
        return questions
            .filter(question => searchQuery ? question.text && question.text.toLowerCase().includes(searchQuery.toLowerCase()) : true)
            .filter(question => subject ? question.subject._id === subject : true)
            .map((question, i) => {
                const sub = find(subjects, { id : question.subject});
            return (
                <tr
                    key={i}
                >
                    <th scope='row'>{i}</th>
                    <td className='QuestionText'>
                        {question.text}
                    </td>
                    <td>
                        {sub ? sub.title : 'N/A'}
                    </td>
                    <td>
                        <ButtonToolbar>
                            <Button onClick={this.handleClickEditQuestion.bind(this, question.id)}>Edit</Button>
                            <Button onClick={this.handleClickDeleteQuestion.bind(this, question.id)}>Delete</Button>
                        </ButtonToolbar>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <Row  className='listItems'>
                <Panel>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Text</th>
                                <th>Subject</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderQuestionsList() }
                        </tbody>
                    </Table>
                </Panel>
            </Row>
        );
    }
}
