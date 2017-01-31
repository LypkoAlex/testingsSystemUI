import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router'

import App            from './components/App'
import MainLayout     from './components/layouts/MainLayout'
import AdminLayout    from './components/layouts/AdminLayout'
import TestingsPage   from './components/pages/TestingsPage'
import SpecialityPage from './components/pages/SpecialityPage'
import SubjectPage    from './components/pages/SubjectPage'
import TestPage       from './components/pages/TestPage'
import Feedback       from './components/pages/Feedback'
import Restore        from './components/pages/Restore'
import ExamsPage      from './components/pages/ExamsPage'
import EditExamPage   from './components/pages/EditExamPage'
import QuestionsPage  from './components/pages/QuestionsPage'
import QuestionEditor from './components/pages/QuestionEditor'

export default () => {
    return (
        <Route component={App}>
            <Redirect from='/' to='/test' />
            <Redirect from='' to='/test' />
            <Redirect from='/admin' to='/admin/questions' />
            <Redirect from='/admin/' to='/admin/questions' />
            <Route path='/' component={MainLayout}>
                <Route path='/test' component={TestingsPage} />
                <Route path='/test/:testId' component={TestPage} />
                <Route path='/feedback' component={Feedback} />
                <Route path='/restore' component={Restore} />
            </Route>
            <Route path='/admin' component={AdminLayout} >
                <Route path='/admin/questions'      component={QuestionsPage} />
                <Route path='/admin/questions/:questionsId' component={QuestionEditor}/>}
                <Route path='/admin/exams'          component={ExamsPage} />
                <Route path='/admin/exams/:examsId' component={EditExamPage} />
                <Route path='/admin/subjects'       component={SubjectPage} />
                <Route path='/admin/spaciality'     component={SpecialityPage} />
            </Route>
        </Route>
    )
}
