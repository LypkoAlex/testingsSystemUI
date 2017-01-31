import { observable, action, runInAction, asStructure } from 'mobx';
import { get, post, patch, del } from '../api.js';

class TestStore {
    @observable currentSubject = undefined;
    @observable isLoading = true;
    @observable correct = -1;
    @observable question = {};
    @action createTest = async (examId, data) => {
        try {
            return await post(`/exams/${examId}/test`, data);
        } catch (error) {
            console.log(error);
        }
    }

    @action getQuestion = async (testId) => {
        try {
            const question = await get(`/tests/${testId}/nextQuestion`);
            console.log('QUESTION', question);
            runInAction('Get question', () => {
                this.correct = -1;
                this.question = { ...question };
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action checkAnswer = async (data, testId) => {
        console.log('data', data);
        try {
            const answer = await post(`/tests/${testId}/checkAnswer`, data);
            runInAction('Check answer', () => {
                this.correct = answer.correct;
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const singleton = new TestStore();

export default singleton;
