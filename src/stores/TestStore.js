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
            this.isLoading = true;
            const question = await get(`/tests/${testId}/nextQuestion`);
            runInAction('Get question', () => {
                this.correct = -1;
                this.question = { ...question };
                this.isLoading = false;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action checkAnswer = async (data, testId) => {
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
