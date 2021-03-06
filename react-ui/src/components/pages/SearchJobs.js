import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/search_jobs.js';
import {Link} from 'react-router';
import DropdownList from 'react-widgets/lib/DropdownList';
import categories from '../../constants/job_categories.js';
import LoadingIndicator from 'react-loading-indicator';
const numberOfCharacters = 220;

class BrowseJobs extends Component {
    constructor() {
        super();
        this.renderJobs = this.renderJobs.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.formatDesc = this.formatDesc.bind(this);
        this.onJobSearchChange = this.onJobSearchChange.bind(this);
    }

    componentWillMount() {
        this.props.fetchJobs();
    }

    formatDate(date) {
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);

        return `${day}/${month}/${year}`;
    }

    formatTime(time) {
        return time.slice(0, 5);
    }

    formatDesc(desc) {
        if (desc.length <= numberOfCharacters) {
            return desc;
        } else {
            return desc.slice(0, numberOfCharacters) + '...';
        }
    }
    onSubmit(evt) {
        evt.preventDefault();
        this.props.fetchJobs(this.props.SearchTerm);
    }

    onJobSearchChange(evt) {
        this.props.setTerm(evt.value);
    }

    renderJobs(job) {
        return (
            <div className="job_wrapper" key={job.jobId}>
                <h3 className="pt-2 brown_title">
                    {job.jobTitle}
                </h3>
                <h5 className="italic">
                    {job.jobCategories}
                </h5>
                <p className="italic description">
                    {this.formatDesc(job.description)}
                </p>

                <div className="container">
                    <div className="row justify-content-between align-items-baseline">
                        <div className="date_searchJobs">
                            <img
                                className="calendar-icon"
                                src={require('../../utils/if_10_171505.svg')}
                            />
                            <div className="date-item">
                                {this.formatDate(job.startDate)}
                            </div>
                        
                            <div>
                                {this.formatTime(job.startTime)}
                            </div>
                        </div>
                        <Link
                            className="btn btn-primary view-details"
                            to={`/jobdetail/${job.jobId}`}
                        >
                            View details
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let {jobs} = this.props;
        let jobsList = jobs && jobs.jobsList;

        if (!jobsList) {
            return (
                <div className="register_container flex-container">
                    <LoadingIndicator />
                </div>
            );
        }

        return (
            <div className="container">
                <article className="row justify-content-md-center search_jobs">
                    <section className="col col-md-8">
                        {this.props.isAuthenticated === true
                            ? <div className="row px-3 justify-content-center justify-content-md-end pull-right">
                                <Link
                                    to="/updatestudents"
                                    className="btn btn-primary ml-2 submit_button"
                                >
                                      Update your profile
                                </Link>
                                <Link
                                    to="/jobsapplied"
                                    className="btn btn-primary ml-2 submit_button"
                                >
                                      My applications
                                </Link>
                            </div>
                            : <div className="row px-3 justify-content-center justify-content-md-end">
                                <Link
                                    to="/login"
                                    className="btn btn-primary submit_button"
                                >
                                    Login to your profile
                                </Link>
                            </div>}
                        <form onSubmit={this.onSubmit}>
                            <DropdownList
                                id="browseJobsForm"
                                className="form-control"
                                placeholder="Browse Jobs"
                                data={categories}
                                textField="value"
                                onChange={this.onJobSearchChange}
                                value={this.props.SearchTerm}
                                groupBy="group"
                            />
                            <div className="button" >
                                {this.props.jobs.status === 'pending'
                                    ? <LoadingIndicator />
                                    : <button className="btn btn-primary" type="submit">
                                        Submit
                                    </button>}
                            </div>
                        </form>
                        <ul className="search_results_ul">
                            {jobsList.map(this.renderJobs)}
                        </ul>
                    </section>
                </article>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const isAuthenticated =
        state.auth &&
        state.auth.response &&
        state.auth.response.isAuthenticated;

    return {
        jobs: state.searchJobs.jobsRequest.response,
        SearchTerm: state.searchJobs.searchTerm,
        selectedJob: state.searchJobs.selectedJob,
        isAuthenticated,
    };
}

export default connect(mapStateToProps, actions)(BrowseJobs);
