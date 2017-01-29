import React from 'react';
import {Route, IndexRoute} from 'react-router'

import App from './components/App'
import MainLayout from './components/layouts/MainLayout'
import AdminLayout from './components/layouts/AdminLayout'
import TestingsPage from './components/pages/TestingsPage'
import SpecialityPage from './components/pages/SpecialityPage'
import SubjectPage from './components/pages/SubjectPage'
import TestPage from './components/pages/TestPage'
import ExamsPage from './components/pages/ExamsPage'
import EditExamPage from './components/pages/EditExamPage'

export default () => {
    return (
        <Route component={App}>
            <Route path='/' component={MainLayout}>
                <Route path='/test' component={TestingsPage} />
                <Route path='/test/:testId' component={TestPage} />
            </Route>
            <Route path='/admin' component={AdminLayout} >
                {/* <Route path='/admin/questions'      component={QuestionsPage} />
                <Route path='/admin/questions/edit' component={QuestionEditor}/> */}
                <Route path='/admin/exams'          component={ExamsPage} />
                <Route path='/admin/exams/:examsId' component={EditExamPage} />
                <Route path='/admin/subjects'       component={SubjectPage} />
                <Route path='/admin/spaciality'     component={SpecialityPage} />
            </Route>
        </Route>
    )
}
