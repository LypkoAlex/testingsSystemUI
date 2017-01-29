import { observable, action, runInAction, asStructure } from 'mobx';
import { get, post, patch, del } from '../api.js';

class QuestionsStore {
    @observable questions = [];
    @observable question = {};
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

    // Запитати Рому
    // @action fetchQuestion = async (id) => {
    //     const question = await get(`/questions/${id}`);
    //     console.log(question);
    //     this.question = { ...question };
    // }

    @action createQuestion = async (subjectId, data) => {
        try {
            console.log(data);
            await post(`/subjects/${subjectId}/questions`, data);
            // await this.fetchQuestions();
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
