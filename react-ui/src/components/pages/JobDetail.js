import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/job_apply.js';
import LoadingIndicator from 'react-loading-indicator';

class JobDetail extends Component {
    constructor() {
        super();
        this.renderJob = this.renderJob.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.submitJobApplication = this.submitJobApplication.bind(this);
    }

    componentDidMount() {
        if (!this.props.jobs) {
            this.props.fetchJobs();
        }
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

    submitJobApplication(jobId, residentId, studentId) {
        this.props.submitJobApplication(jobId, residentId, studentId);
    }

    renderJob() {
        if (!this.props.jobs) {
            return (
                <div className="register_container flex-container">
                    <LoadingIndicator />
                </div>
            );
        }

        if (this.props.applied.includes(Number(this.props.jobId))) {
            return (
                <div className="parent-container">
                    <div>
                        <div className="flex-container">
                            <img
                                className="success_image"
                                src={require('../../utils/lemmling-Cartoon-beaver.svg')}
                            />
                        </div>

                        <div className="flex-container">SUCCESS!</div>
                        <div className="flex-container">
                            <h6 className="success_message">
                                Your application has been sent
                            </h6>
                        </div>
                    </div>
                </div>
            );
        }
        var jobObj = {};
        var arr = this.props.jobs;
        for (var i = 0; i < arr.length; ++i) jobObj[arr[i].jobId] = arr[i];

        var job = jobObj[this.props.jobId];

        return (
            <div>
                <div key={job.jobId} className="container_brown">
                    <h3 className="mt-2">
                        {job.jobTitle}
                    </h3>
                    {job.jobCategories}
                </div>
                <div className="job_description">
                    <p className="italic">
                        {job.description}
                    </p>
                    <div className="date">
                        <img
                            className="calendar-icon"
                            src={require('../../utils/if_72-Calendar_2123904.svg')}
                        />

                        <div className="date-item">
                            {this.formatDate(job.startDate)}
                        </div>

                        <div>-</div>

                        <div className="date-item">
                            {this.formatDate(job.endDate)}
                        </div>
                    </div>
                    <div className="date">
                        <img
                            className="calendar-icon"
                            src={require('../../utils/if_10_171505.svg')}
                        />
                        <div className="date-item">
                            {this.formatTime(job.startTime)}
                        </div>

                        <div>-</div>

                        <div className="date-item">
                            {this.formatTime(job.endTime)}
                        </div>
                    </div>
                    <div className="flex-container">
                        <div className="rectangle-3">
                            £{job.rate}
                        </div>
                    </div>
                    <div className="flex-container">
                        <div className="apply">
                            {this.props.status === 'pending'
                                ? <LoadingIndicator />
                                : <button
                                    className="btn btn-primary apply-button"
                                    onClick={() =>
                                        this.submitJobApplication(
                                            job.jobId,
                                            job.residentId,
                                            this.props.studentId
                                        )}
                                >
                                      APPLY
                                </button>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <section>
                {this.renderJob()}
            </section>
        );
    }
}
// <div className="container-fluid register_container">
//   <article className="row-fluid">

//studentId disappears on page reload
function mapStateToProps(state, ownProps) {
    var studentId = state.auth && state.auth.response && state.auth.response.id;

    var searchJobs =
        state.searchJobs.jobsRequest &&
        state.searchJobs.jobsRequest.response &&
        state.searchJobs.jobsRequest.response.jobsList;

    var applyJobs =
        state.applyJob.jobsRequest &&
        state.applyJob.jobsRequest.response &&
        state.applyJob.jobsRequest.response.jobsList;

    var jobs = searchJobs || applyJobs;

    return {
        applied: state.applyJob.applied,
        jobId: ownProps.params.id,
        status: state.applyJob.status,
        studentId,
        jobs,
    };
}

export default connect(mapStateToProps, actions)(JobDetail);
