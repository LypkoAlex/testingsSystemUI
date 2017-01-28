import { observable, action, runInAction, asStructure } from 'mobx';
import { get, post, patch, del } from '../api.js';

class QuestionsStore {
    @observable questions = [];
    @observable currentQuestion = undefined;
    @observable isLoading = true;

    @action fetchQuestions = async () => {
        this.isLoading = true;

        try {
            const questions = await get('/questions');

            runInAction('Update state after fetchQuestions', () => {
                this.questions.replace(questions);
                this.isLoading = false;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action setCurrentQuestion = id => {
        this.currentQuestion = this.questions.find(question => question.id === id);
    }

    @action createQuestiion = async data => {
        try {
            await post('/questions', data);
            await this.fetchQuestions();
        } catch (error) {
            console.log(error);
        }
    }

    @action updateQuestion = async({ data, id }) => {
        try {
            await patch(`/questions/${id}`, data);
            await this.fetchQuestions();
        } catch (error) {
            console.log(error);
        }
    }
}

const singleton = new QuestionsStore();

export default singleton;
