import { observable, action, runInAction, asStructure } from 'mobx';
import { get, post, patch, del } from '../api.js';
import { admin } from '../../etc/config.json';
// const admin = config.admin;
class QuestionsStore {
    @observable isAuth = false;

    @action auth = async data => {
        if( data.login === admin.username && data.password === admin.password)
        this.isAuth = true;
    }

    @action logOut = async () => {
        this.isAuth = false;
    }
}

const singleton = new QuestionsStore();

export default singleton;
