import { observable, action, runInAction, asStructure } from 'mobx';
import { get, post, patch, del } from '../api.js';

class QuestionsStore {
    @observable questions = [];
    @observable question = asStructure({});
    @observable isLoading = true;

    @action fetchQuestions = async () => {
        this.isLoading = true;

        try {
            const questions = await get('/questions');

            runInAction('Update state after fetchQuestion', () => {
                this.questions.replace(questions);
                this.isLoading = false;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action fetchQuestion = async id => {
        try {
            const question = await get(`/questions/${id}`);
            runInAction('Update state after fetchQuestion', () => {
                this.question = question.text ? question : {};
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action resetQuestion = () => {
        runInAction('Update state after fetchQuestion', () => {
            this.question = {};
        });
    }

    @action createQuestion = async (subjectId, data) => {
        try {
            await post(`/subjects/${subjectId}/questions`, data);
            // await this.fetchQuestions();
        } catch (error) {
            console.log(error);
        }
    }

    @action updateQuestion = async(id, data) => {
        try {
            await patch(`/questions/${id}`, data);
            // await this.fetchQuestion(id);
        } catch (error) {
            console.log(error);
        }
    }

    @action deleteQuestion = async(id) => {
        try {
            await del(`/questions/${id}`);
            await this.fetchQuestions(id);
        } catch (error) {
            console.log(error);
        }
    }
}

const singleton = new QuestionsStore();

export default singleton;
