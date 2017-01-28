import { observable, action, runInAction, asStructure } from 'mobx';
import { get, post, patch, del } from '../api.js';

class ExamsStore {
    @observable currentSubject = undefined;
    @observable isLoading = true;
    @observable exams = [];
    @action fetchExamsById = async (specialityId) => {
        this.isLoading = true;

        try {
            const exams = await get(`/specialities/${specialityId}/exams`);

            runInAction('Update state after fetchSubjects', () => {
                this.exams.replace(exams);
                // console.log(exams);
                this.isLoading = false;
            });
        } catch (error) {
            console.log(error);
        }
    }
}

const singleton = new ExamsStore();

export default singleton;
