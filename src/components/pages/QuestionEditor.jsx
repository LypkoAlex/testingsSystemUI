import React, { Component, PropTypes }          from 'react';
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

import CSSModules from 'react-css-modules';
import styles     from './QuestionEditor.less';

@inject('viewStore', 'questionsStore', 'subjectStore') @observer @CSSModules(styles)
export default class QuestionEditor extends Component {
    static propTypes = {
        viewStore: MobxTypes.observableObject,
        questionsStore: MobxTypes.observableObject
    };

    async componentWillMount() {
        const { subjectStore } = this.props;

        await subjectStore.fetchSubjects();
    }

    handleSaveAndNew = () => {

    }

    handleSave = async () => {
        const { questionsStore } = this.props;
        const { currentQuestion } = questionsStore;

        const answers = [
            this.answer1.value, this.answer2.value,
            this.answer3.value, this.answer4.value,
            this.answer5.value, this.answer6.value
        ];

        const data = {
            text: this.text.value,
            answers: answers,
            subject: this.selectedSubject
        }
        console.log(data);
        try {
            if (currentQuestion) {
                await questionsStore.updateQuestion({ id: currentQuestion.id, data });
            } else {
                await questionsStore.createQuestion(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleClose = () => {

    }

    handleSubjectSelect = (e) => {
        this.selectedSubject = e.target.value;
    }

    renderSubjectsList() {
        const { currentQuestion } = this.props.questionsStore;
        const { subjects } = this.props.subjectStore;

        return subjects.map((subject, i) => {
            if (currentQuestion.subject.id === subject.id) {
                return (
                    <option selected key={subject.id} value={subject.id}>{subject.title}</option>
                );
            }

            return (
                <option key={subject.id} value={subject.id}>{subject.title}</option>
            );
        });
    }

    render() {
        const { currentQuestion } = this.props.questionsStore;

        return (
            <div styleName='QuestionEditor'>
                <div styleName='content'>
                    <div styleName='editBlock'>
                        <div
                            className='btn btn-primary'
                            styleName='editButton'
                            onTouchTap={this.handleSaveAndNew}
                        >
                            Save and new
                        </div>
                        <div
                            className='btn btn-primary'
                            styleName='editButton'
                            onTouchTap={this.handleSave}
                        >
                            Save
                        </div>
                        <div
                            className='btn btn-primary'
                            onTouchTap={this.handleClose}
                        >
                            Close
                        </div>
                    </div>
                    <div styleName='formsBlock'>
                        <form style={{width: '100%'}}>
                            <select
                                className='custom-select'
                                value={this.selectedSubject}
                                onChange={this.handleSubjectSelect}
                            >
                                {this.renderSubjectsList()}
                            </select>
                            <div className='form-group'>
                                <label for='question'>Question</label>
                                <textarea
                                    ref={text => this.text = text}
                                    className='form-control'
                                    id='exampleTextarea'
                                    rows='3'
                                    defaultValue={ currentQuestion ? currentQuestion.text : '' }
                                />
                            </div>
                            <div className='form-group' styleName='formGroup'>
                                <label for='Answer1' styleName='label'>Answer 1</label>
                                <input
                                    ref={answer => this.answer1 = answer}
                                    type='text'
                                    className='form-control'
                                    styleName='formControl'
                                    id='Answer1'
                                    defaultValue={ currentQuestion ? currentQuestion.answers[0] : 'Answer 1'}
                                />
                                <div className='form-check' styleName='formCheck'>
                                    <label className='form-check-label' styleName='formCheckLabel'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            styleName='formCheckInput'
                                        />
                                        Correct
                                    </label>
                                </div>
                            </div>
                            <div className='form-group' styleName='formGroup'>
                                <label for='Answer2' styleName='label'>Answer 2</label>
                                <input
                                    ref={answer => this.answer2 = answer}
                                    type='text'
                                    className='form-control'
                                    styleName='formControl'
                                    id='Answer2'
                                    defaultValue={ currentQuestion ? currentQuestion.answers[1] : 'Answer 2'}
                                />
                                <div className='form-check' styleName='formCheck'>
                                    <label className='form-check-label' styleName='formCheckLabel'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            styleName='formCheckInput'
                                        />
                                        Correct
                                    </label>
                                </div>
                            </div>
                            <div className='form-group' styleName='formGroup'>
                                <label for='Answer3' styleName='label'>Answer 3</label>
                                <input
                                    ref={answer => this.answer3 = answer}
                                    type='text'
                                    className='form-control'
                                    styleName='formControl'
                                    id='Answer3'
                                    defaultValue={ currentQuestion ? currentQuestion.answers[2] : 'Answer 3'}
                                />
                                <div className='form-check' styleName='formCheck'>
                                    <label className='form-check-label' styleName='formCheckLabel'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            styleName='formCheckInput'
                                        />
                                        Correct
                                    </label>
                                </div>
                            </div>
                            <div className='form-group' styleName='formGroup'>
                                <label for='Answer4' styleName='label'>Answer 4</label>
                                <input
                                    ref={answer => this.answer4 = answer}
                                    type='text'
                                    className='form-control'
                                    styleName='formControl'
                                    id='Answer4'
                                    defaultValue={ currentQuestion ? currentQuestion.answers[3] : 'Answer 4'}
                                />
                                <div className='form-check' styleName='formCheck'>
                                    <label className='form-check-label' styleName='formCheckLabel'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            styleName='formCheckInput'
                                        />
                                        Correct
                                    </label>
                                </div>
                            </div>
                            <div className='form-group' styleName='formGroup'>
                                <label for='Answer5' styleName='label'>Answer 5</label>
                                <input
                                    ref={answer => this.answer5 = answer}
                                    type='text'
                                    className='form-control'
                                    styleName='formControl'
                                    id='Answer5'
                                    defaultValue={ currentQuestion ? currentQuestion.answers[4] : 'Answer 5'}
                                />
                                <div className='form-check' styleName='formCheck'>
                                    <label className='form-check-label' styleName='formCheckLabel'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            styleName='formCheckInput'
                                        />
                                        Correct
                                    </label>
                                </div>
                            </div>
                            <div className='form-group' styleName='formGroup'>
                                <label for='Answer6' styleName='label'>Answer 6</label>
                                <input
                                    ref={answer => this.answer6 = answer}
                                    type='text'
                                    className='form-control'
                                    styleName='formControl'
                                    id='Answer6'
                                    defaultValue={ currentQuestion ? currentQuestion.answers[5] : 'Answer 6'}
                                />
                                <div className='form-check' styleName='formCheck'>
                                    <label className='form-check-label' styleName='formCheckLabel'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            styleName='formCheckInput'
                                        />
                                        Correct
                                    </label>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label className='custom-file'>
                                    <input
                                        type='file'
                                        id='file'
                                        className='custom-file-input'
                                    />
                                    <span className='btn btn-primary custom-file-control'>Upload Photo</span>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
