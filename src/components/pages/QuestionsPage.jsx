import React, { Component, PropTypes }          from 'react';
import { Link } from 'react-router';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

import QuestionsTable           from '../widgets/QuestionsList';


@inject('viewStore', 'questionsStore') @observer
export default class QuestionsPage extends Component {
    static propTypes = {
        viewStore: MobxTypes.observableObject,
        questionsStore: MobxTypes.observableObject
    };

    @observable searchQuery = '';

    async componentWillMount() {
        const { fetchQuestions } = this.props.questionsStore;
        await fetchQuestions();
    }

    handleAddQuestion = () => {
        const { viewStore } = this.props;

        viewStore.setCurrentPage('edit');
    }

    handleSearch = (e, value) => {
        this.searchQuery = value;
    }

    render() {
        const { questions } = this.props.questionsStore;

        return (
            <div>
                <div>
                    <div>
                        <input
                            className='form-control'
                            type='text'
                            value={this.searchQuery}
                            onChange={this.handleSearch}
                        />
                        <div
                            className='btn btn-primary'

                            onTouchTap={this.handleSearch}
                        >
                            Search
                        </div>
                        <Link to='/admin/questions/new'>Add</Link>
                    </div>
                    <div>
                        {
                            questions
                            ? <QuestionsTable
                                questions={questions}
                                // searchQuery={this.searchQuery}
                            />
                            : 'Questions'
                        }
                    </div>
                </div>
            </div>
        );
    }
}
