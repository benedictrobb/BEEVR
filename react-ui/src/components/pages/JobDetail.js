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
        return date.slice(0, 10);
    }

    formatTime(time) {
        return time.slice(0, 5);
    }

    submitJobApplication() {
        this.props.submitJobApplication(this.props.jobId);
    }

    renderJob() {
        if (!this.props.jobs) {
            return (
                <p className="text-center register_container">
                    {' '}<h3>Loading</h3>
                </p>
            );
        }
        if (this.props.applied.includes(this.props.jobId)) {
            return (
                <div className="text-center register_container">
                    <h3>APPLICATION SUCCESSFUL</h3>
                </div>
            );
        }
        var jobObj = {};
        var arr = this.props.jobs;
        for (var i = 0; i < arr.length; ++i) jobObj[arr[i].jobId] = arr[i];

        var job = jobObj[this.props.jobId];

        return (
            <div className="container-fluid register_container">
                <div className="row-fluid">
                    <div key={job.jobId} className="col-md-8 col-md-offset-2 ">
                        <h3 className="job_title">
                            {job.jobTitle}
                        </h3>
                        <h5 className="job_title">
                            {job.jobCat}
                        </h5>
                        <p>
                            {job.description}
                        </p>

                        <label>
                            <u>Start Date</u>
                        </label>

                        <p>
                            {this.formatDate(job.startDate)}
                        </p>
                        <label>
                            <u>Start Time</u>
                        </label>
                        <p>
                            {this.formatTime(job.startTime)}
                        </p>
                        <u>
                            <label>
                                <u>End Date</u>
                            </label>
                        </u>
                        <p>
                            {this.formatDate(job.endDate)}
                        </p>
                        <u>
                            <label>
                                <u>End Time</u>
                            </label>
                        </u>
                        <p>
                            {this.formatTime(job.endTime)}
                        </p>
                        <u>
                            <label>
                                <u>Rate</u>
                            </label>
                        </u>
                        <p>
                            {job.rate}
                        </p>
                        <div>
                            {this.props.status === 'pending'
                                ? <LoadingIndicator />
                                : <button
                                    className="btn btn-primary"
                                    onClick={this.submitJobApplication}
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
            <div>
                {this.renderJob()}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
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
        jobs,
    };
}

export default connect(mapStateToProps, actions)(JobDetail);
