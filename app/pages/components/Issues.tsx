import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from 'react-bootstrap/Toast'
import IssueCard from './IssueCard'
import { Issue, AppState, DefaultLabels, Query } from '../../src/data/Interfaces'
import ApiClient from '../../src/utils/ApiClient'
import _ from "lodash";
import EmailService from '../../src/utils/EmailService';

class Issues extends React.Component {
    state: AppState = {
        issues: [],
        apiClient: new ApiClient(),
        status: 'Loading'
    }

    MockQuery = () => {
        const bugLabel: DefaultLabels = 'bug'
        const enhancementLabel: DefaultLabels = 'enhancement'
        let query: Query = {
            languageQuery: this.state.apiClient.getLanguageQuery(['typescript', 'js'], ['c']),
            labelsQuery: this.state.apiClient.getLabelsQuery([bugLabel, enhancementLabel]),
        }
        return query
    }

    GetIssues = async (): Promise<void> => {
        const query: Query = this.MockQuery()
        const issues: Promise<Issue[]> = this.state.apiClient.constructQueryAndCallAPI(query)
        _.isEmpty(await issues) ? this.UpdateIssuesAndStatus('Failure') : this.UpdateIssuesAndStatus('Success', await issues)
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
        var emailService: EmailService = new EmailService()
        emailService.sendMail('cwq23drexel@gmail.com', 'New Issues From GitHub', this.state.issues.toString())
            .then((msg: any) => {
                console.log(`SendMail Result: ${msg}`)
            })
    }

    render() {
        return (
            <Toast>
                <Toast.Body>
                    {
                        this.state.issues ?
                            this.state.issues.map((issue: Issue) => {
                                return <IssueCard key={issue.id}
                                    issue={issue}
                                />;
                            }) : `There are no results`
                    }
                </Toast.Body>
            </Toast>
        )
    }
}

export default Issues;