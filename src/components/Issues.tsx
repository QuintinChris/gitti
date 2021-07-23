import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from 'react-bootstrap/Toast'
import IssueCard from './IssueCard'
import { Issue, AppState, AppProps, DefaultLabels, KeywordLocation, Query } from '../data/Interfaces'
import ApiClient from '../api/ApiClient'
import _ from "lodash";

class Issues extends React.Component<AppProps, AppState> {
    state: AppState = {
        issues: [],
        apiClient: new ApiClient(),
        status: 'Loading'
    }

    MockQuery = () => {
        const bugLabel: DefaultLabels = 'bug'
        const enhancementLabel: DefaultLabels = 'enhancement'
        const location: KeywordLocation = 'body';
        let query: Query = {
            languageQuery: this.state.apiClient.getLanguageQuery(['typescript', 'js'], ['c']),
            labelsQuery: this.state.apiClient.getLabelsQuery([bugLabel, enhancementLabel]),
            keywordQuery: this.state.apiClient.getKeywordQuery('', location),
            excludedItems: this.state.apiClient.getExcludedItems([''])
        }
        return query
    }

    GetIssues = async (): Promise<void> => {
        const query: Query = this.MockQuery()
        const issues: Issue[] = this.state.apiClient.constructQueryAndCallAPI(query)
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

    componentDidMount = () => {
        this.GetIssues();
    }

    render() {
        return (
            <Toast>
                <Toast.Body>
                    {
                        this.state.issues ?
                            this.state.issues.map((issue: Issue) => {
                                return <IssueCard
                                    issue={issue}
                                />;
                            }) : ``
                    }
                </Toast.Body>
            </Toast>
        )
    }
}

export default Issues;