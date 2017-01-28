import { observable, action, computed, reaction, asStructure } from 'mobx';
import { browserHistory }              from 'react-router';

class ViewStore {
    constructor() {
        reaction(
            'CurrentPath change reaction',
            () => this.currentPath,
            currentPath => {
                if (currentPath && currentPath !== location.pathname) {
                    browserHistory.push(currentPath);
                }
            }
        );
    }

    @observable currentDialog = undefined;
    @observable currentPage = undefined;

    @computed get currentPath() {
        switch (this.currentPage) {
            case 'questions':
                return '/admin/questions';
            case 'edit':
                return '/admin/questions/edit'
            case 'subject':
                return '/admin/subject';
            case 'exams':
                return '/admin/exams';
            case 'spaciality':
                return '/admin/spaciality';
            default:
                return undefined;
        }
    }

    @action setCurrentDialog(nextDialog) {
        this.currentDialog = nextDialog;
    }

    @action setCurrentPage(page) {
        this.currentPage = page;
    }
}

const singleton = new ViewStore();

export default singleton;
