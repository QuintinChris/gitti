import { Issue } from './Interfaces'

const MockIssues: Issue[] = [
    {
        name: "First Issue",
        title: "Fix the fact that this is the first issue",
        labels: ["help-wanted", "good-first-issue", "bug"],
        description: "this describes the issue",
        repo: "http://github.com/blahblahblah",
    },
    {
        name: "Second Issue",
        title: "This is the issue title",
        labels: ["help-wanted", "first timers only", "enhancement"],
        description: "this describes the issue",
        repo: "http://github.com/blahblahblah",
    }
]

export default MockIssues;