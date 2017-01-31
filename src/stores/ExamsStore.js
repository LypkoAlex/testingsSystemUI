import { observable, action, runInAction, asStructure } from 'mobx';
import { get, post, patch, del } from '../api.js';

class ExamsStore {
    @observable currentSubject = undefined;
    @observable isLoading = true;
    @observable exams = [];
    @observable exam = {};
    @action fetchExamsById = async (specialityId) => {
        this.isLoading = true;

        try {
            const exams = await get(`/specialities/${specialityId}/exams`);

            runInAction('Update state after fetchSubjects', () => {
                this.exams.replace(exams);
                this.isLoading = false;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action fetchExams = async () => {
        this.isLoading = true;
        try {
            const exams = await get(`/exams`);

            runInAction('Update state after fetchSubjects', () => {
                this.exams.replace(exams);
                this.isLoading = false;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action fetchExam = async id => {
        this.isLoading = true;
        try {
            const exam = await get(`/exams/${id}`);
            runInAction('Update state after fetchSubjects', () => {
                this.exam = exam;
                this.isLoading = false;
            });
        } catch (error) {
            this.isLoading = false;
            console.log(error);
        }
    }

    @action createExam = async (specialityId, data) => {
        await post(`/specialities/${specialityId}/exams`, data);
        await this.fetchExams();
    }

    @action updateExam = async (id, data) => {
        this.isLoading = true;
        const exam = await patch(`/exams/${id}`, data);
        await this.fetchExams();
        runInAction('Update state after fetchSubjects', () => {
            this.exam = { ...exam };
            this.isLoading = false;
        });
    }

    @action deleteExam = async (id) => {
        await del(`/exams/${id}`);
        await this.fetchExams();
    }
}

const singleton = new ExamsStore();

export default singleton;
