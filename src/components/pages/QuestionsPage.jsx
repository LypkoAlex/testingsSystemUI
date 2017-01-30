import React, { Component, PropTypes }          from 'react';
import { Link } from 'react-router';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

import QuestionsTable           from '../widgets/QuestionsList';

import CSSModules               from 'react-css-modules';
import styles                   from './QuestionsPage.css';

@inject('viewStore', 'questionsStore') @observer @CSSModules(styles)
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
            <div styleName='QuestionsPage'>
                <div styleName='content'>
                    <div styleName='searchBar'>
                        <input
                            className='form-control'
                            type='text'
                            value={this.searchQuery}
                            onChange={this.handleSearch}
                        />
                        <div
                            className='btn btn-primary'
                            styleName='searchBarButton'
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
