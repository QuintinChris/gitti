import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from 'react-bootstrap/Toast'
import IssueCard from './IssueCard'
import { Issue, IssueProps, AppState, AppProps } from '../data/Interfaces'
import ApiClient from '../api/ApiClient'
import * as _ from "lodash"

class Issues extends React.Component<AppProps, AppState> {
    state: AppState = {
        issues: [],
        apiClient: new ApiClient(),
        status: 'Loading'
    }

    GetIssues = async (): Promise<void> => {
        const issues: Issue[] = this.state.apiClient.constructQueryAndCallAPI()
        _.isEmpty(issues) ? this.UpdateIssuesAndStatus('Failure') : this.UpdateIssuesAndStatus('Success', issues)
    }

    UpdateIssuesAndStatus = (status: string, issues?: Issue[]) => {
        if (status === 'Success') {
            this.state.issues = issues!
            this.state.status = 'Success'
        }
        else if (status === 'Failure') {
            this.state.status = 'Failure'
            // this.state.message = 'An error occured fetching data from API'
        }
    }

    render() {
        return (
            // map issues here
            <Toast>
                <Toast.Body>
                    {
                        this.props.issues ?
                            this.props.issues.map((issue: Issue) => {
                                return <IssueCard
                                    issues={issues}
                                />;
                            }) : ``
                    }
                </Toast.Body>
            </Toast>
        )
    }
}

export default Issues;