import { observable, action, runInAction, asStructure } from 'mobx';
import { get, post, patch, del } from '../api.js';

class SpecialitiesStore {
    @observable specialities = [];
    // @observable currentQuestion = undefined;
    @observable isLoading = true;

    @action fetchSpecialities = async () => {
        this.isLoading = true;

        try {
            const specialities = await get('/specialities');

            runInAction('Update state after fetchQuestions', () => {
                this.specialities.replace(specialities);
                this.isLoading = false;
                console.log(specialities);
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action updateSpeciality = async (id, data) => {
        await patch(`/specialities/${id}`, data);
        await this.fetchSpecialities();
    }

    @action deleteSpeciality = async (id) => {
        await del(`/specialities/${id}`);
        await this.fetchSpecialities();
    }

    @action createSpeciality = async (data) => {
        console.log(data);
        await post(`/specialities`, data);
        await this.fetchSpecialities();
    }


    // @action setCurrentQuestion = id => {
    //     this.currentQuestion = this.questions.find(question => question.id === id);
    // }

    // @action createQuestiion = async data => {
    //     try {
    //         await post('/questions', data);
    //         await this.fetchQuestions();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    //
    // @action updateQuestion = async({ data, id }) => {
    //     try {
    //         await patch(`/questions/${id}`, data);
    //         await this.fetchQuestions();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}

const singleton = new SpecialitiesStore();

export default singleton;
