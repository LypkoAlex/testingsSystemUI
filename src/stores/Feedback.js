import { observable, action, runInAction, asStructure } from 'mobx';
import { get, post, patch, del } from '../api.js';

class QuestionsStore {
    @action sendFeedback = async data => {
        await post(`/feedback`, data);
    }
}

const singleton = new QuestionsStore();

export default singleton;
