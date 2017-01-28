import React from 'react';
import {Route, IndexRoute} from 'react-router'

import App from './components/App'
import MainLayout from './components/layouts/MainLayout'
import TestingsPage from './components/pages/TestingsPage'
import TestPage from './components/pages/TestPage'

export default () => {
    return (
        <Route component={App}>
            <Route path='/' component={MainLayout}>
                <Route path='/test' component={TestingsPage} />
                <Route path='/test/:testId' component={TestPage} />
            </Route>
            {/* <Route path='/admin' component={AdminLayout} >
                <Route path='/admin/questions'      component={QuestionsPage} />
                <Route path='/admin/questions/edit' component={QuestionEditor}/>
                <Route path='/admin/subject'        component={SubjectPage} />
                <Route path='/admin/exams'          component={ExamsPage} />
                <Route path='/admin/spaciality'     component={SpecialityPage} />
            </Route> */}
        </Route>
    )
}
