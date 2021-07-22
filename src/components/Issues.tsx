import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from 'react-bootstrap/Toast'
import IssueCard from './IssueCard'
import { Issue, IssueProps, AppState, AppProps } from '../data/Interfaces'
import ApiClient from '../api/ApiClient'
import _ from "lodash";

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
            this.setState({ issues: issues! })
            this.setState({ status: 'Success' })
        }
        else if (status === 'Failure') {
            this.setState({ status: 'Failure' })
            // this.setState({message: 'An error occured fetching data from API' })
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