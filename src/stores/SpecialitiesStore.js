import { observable, action, runInAction, asStructure } from 'mobx';
import { get, post, patch, del } from '../api.js';

class SpecialitiesStore {
    @observable specialities = [];
    @observable isLoading = true;

    @action fetchSpecialities = async () => {
        this.isLoading = true;

        try {
            const specialities = await get('/specialities');

            runInAction('Update state after fetchQuestions', () => {
                this.specialities.replace(specialities);
                this.isLoading = false;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action updateSpeciality = async (id, data) => {
        this.isLoading = true;
        await patch(`/specialities/${id}`, data);
        await this.fetchSpecialities();
    }

    @action deleteSpeciality = async (id) => {
        this.isLoading = true;
        await del(`/specialities/${id}`);
        await this.fetchSpecialities();
    }

    @action createSpeciality = async (data) => {
        this.isLoading = true;
        await post(`/specialities`, data);
        await this.fetchSpecialities();
    }
}

const singleton = new SpecialitiesStore();

export default singleton;
