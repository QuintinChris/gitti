import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from 'react-bootstrap/Toast'
import IssueCard from './IssueCard'
import { Issue, IssueProps, AppState, AppProps } from '../data/Interfaces'
import ApiClient from '../api/ApiClient'

class Issues extends React.Component<AppProps, AppState> {
    state: AppState = {
        apiClient: new ApiClient()
    }

    GetIssues = async (): Promise<void> => {
        const issues: Issue[] = this.state.apiClient.constructQueryAndCallAPI()
        issues ? this.props.issues = issues : this.props.status = 'Failure'
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