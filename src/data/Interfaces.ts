interface Issue {
    name: string,
    title: string,
    labels?: string[],
    description: string,
    repo: string,
}

interface IssueProps {
    issue: Issue
}

interface ApiClient {
    constructQueryAndCallAPI(): Issue[]
}

type AppState = {
    issues: Issue[],
    apiClient: ApiClient,
    status: 'Loading' | 'Failure' | 'Success'
}
interface AppProps extends IssueProps {
    
}

export type {Issue, IssueProps, AppState, AppProps}