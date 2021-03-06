import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {composeWithDevTools} from 'redux-devtools-extension';
import homeReducer from './reducers/index.js';
import LoginPage from './components/pages/LoginPage.js';
import RegisterStudent from './components/pages/RegisterStudent.js';
import UpdateStudents from './components/pages/UpdateStudents.js';
import Dashboard from './components/pages/Dashboard.js';
import NotFound from './components/pages/NotFound.js';
import App from './components/app.js';
import BrowseJobs from './components/pages/SearchJobs.js';
import BrowseStudents from './components/pages/SearchStudents.js';
import RegisterResident from './components/pages/RegisterResident';
import PostJob from './components/pages/PostJob';
import registerServiceWorker from './registerServiceWorker';
import JobPostSuccess from './components/pages/JobPostSuccess.js';
import JobDetail from './components/pages/JobDetail.js';
import MyPostedJobs from './components/pages/MyPostedJobs.js';
import MyJobs from './components/pages/MyJobs.js';
import UpdateResidents from './components/pages/UpdateResidents.js';

//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStore(
    homeReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/login" component={LoginPage} />
                <Route path="/registerstudent" component={RegisterStudent} />
                <Route path="/updatestudents" component={UpdateStudents} />
                <Route path="/updateresidents" component={UpdateResidents} />
                <Route path="/registerresident" component={RegisterResident} />
                <Route
                    path="/browsejobs"
                    component={BrowseJobs}
                    name={'student'}
                />
                <Route
                    path="/browsestudents"
                    component={BrowseStudents}
                    name={'residents'}
                />
                <Route path="/jobdetail/:id" component={JobDetail} />
                <Route path="/postjob" component={PostJob} />
                <Route path="/jobsapplied" component={MyJobs} />
                <Route path="/jobposted" component={JobPostSuccess} />
                <Route path="/mypostedjobs" component={MyPostedJobs} />
                <Route path="/" component={Dashboard} />
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
registerServiceWorker();
