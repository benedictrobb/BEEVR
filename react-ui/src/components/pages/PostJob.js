import React, {Component} from 'react';
import Form_Post_Job from '../Form_Post_Job';

class PostJob extends Component {
    render() {
        return (
            <div className="container register_container">
                <div className="row justify-content-md-center">
                    <div className="col col-md-8 ">
                        <h2>Post a Job</h2>
                        <p>
                            <i>Fields marked with * are mandatory</i>
                        </p>
                        <Form_Post_Job btnText={'Submit'} />
                    </div>
                </div>
            </div>
        );
    }
}

export default PostJob;
