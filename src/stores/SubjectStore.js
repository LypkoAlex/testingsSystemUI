import { observable, action, runInAction, asStructure } from 'mobx';
import { get, post, patch, del } from '../api.js';

class SubjectStore {
    @observable subjects = [];
    @observable currentSubject = undefined;
    @observable isLoading = true;

    @action fetchSubjects = async () => {
        this.isLoading = true;

        try {
            const subjects = await get('/subjects');

            runInAction('Update state after fetchSubjects', () => {
                this.subjects.replace(subjects);
                this.isLoading = false;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action fetchSubjectsBySpeciality = async (specialityId) => {
        this.isLoading = true;

        try {
            const subjects = await get(`/specialities/${specialityId}/subjects`);

            runInAction('Update state after fetchSubjects', () => {
                this.subjects.replace(subjects);
                this.isLoading = false;
            });
        } catch (error) {
            console.log(error);
        }
    }



    @action setCurrentSubject = id => {
        this.currentSubject = this.subjects.find(subject => subject.id === id);
    }
}

const singleton = new SubjectStore();

export default singleton;
