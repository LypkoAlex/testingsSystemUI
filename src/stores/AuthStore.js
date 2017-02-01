import { observable, action, runInAction, asStructure } from 'mobx';
import { get, post, patch, del } from '../api.js';

class QuestionsStore {
    @observable isAuth = false;

    @action auth = async data => {
        if( data.login === 'admin' && data.password === 'admin')
        this.isAuth = true;
    }

    @action logOut = async () => {
        this.isAuth = false;
    }
}

const singleton = new QuestionsStore();

export default singleton;
